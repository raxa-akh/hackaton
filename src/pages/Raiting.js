import React, { useState, useEffect } from "react";
import cls from "../styles/Raiting.module.css";
import Header from "../components/HeaderComponent/Header";
import { goods } from '../api/authService';

const Raiting = () => {
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [hoveredCell, setHoveredCell] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);

    const warehouses = [
        { id: 1, name: "Warehouse A" },
        { id: 2, name: "Warehouse B" },
        { id: 3, name: "Warehouse C" },
    ];

    const rows1 = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}` }));
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K"];
    const columns = Array.from({ length: 8 }, (_, i) => i + 1);
    const cellData = {
        "H6": { content: "Special Item", quantity: 50 },
        // Добавьте другие данные ячеек, если нужно
    };

    const handleWarehouseSelect = (warehouseId) => {
        if (selectedWarehouse?.id !== warehouseId) {
            setSelectedWarehouse(warehouses.find(w => w.id === warehouseId));
            setSelectedRow(null); 
        } else {
            setSelectedWarehouse(null);
            setSelectedRow(null);
        }
    };

    const handleRowSelect = (rowId) => {
        if (!selectedWarehouse) return; 
        setSelectedRow(selectedRow?.id === rowId ? null : rows1.find(r => r.id === rowId));
    };




    const handleCellClick = (row, column) => {
        const cellKey = `${row}${column}`;
        setSelectedCell(cellData[cellKey] || { content: "Empty", quantity: 0 });
    };

    const handleMouseEnter = (row, column) => {
        const cellKey = `${row}${column}`;
        setHoveredCell(cellData[cellKey] || null);
    };

    const handleMouseLeave = () => {
        setHoveredCell(null);
    };

    useEffect(  () => {
        async function fetchData(){
                const response = await goods();
                if(response?.ok){
                    const data = await response.json();
                    console.log(data);
                }
        }
        fetchData();
    },[])

    return (
        <div>
            <Header/>
            <main className={cls.main}>
                <div className={cls.container}>
                    <h1>Warehouse Management</h1>
                    <div className={cls.selectContainer}>
                        {/* Warehouse Dropdown */}
                        <div className={cls.dropdownContainer}>
                            <div>
                                <label htmlFor="warehouseSelect">Select Warehouse:</label>
                                <select
                                    id="warehouseSelect"
                                    value={selectedWarehouse?.id || ""}
                                    onChange={(e) => handleWarehouseSelect(Number(e.target.value))}
                                >
                                    <option value="" disabled>Select a warehouse</option>
                                    {warehouses.map((warehouse) => (
                                        <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedWarehouse && (
                                <button className={cls.deselectButton} onClick={() => handleWarehouseSelect(selectedWarehouse.id)}>
                                    Deselect Warehouse
                                </button>
                            )}
                        </div>

                        {/* Row Dropdown */}
                        {selectedWarehouse && (
                            <div className={cls.dropdownContainer}>
                                <div>
                                    <label htmlFor="rowSelect">Select Row:</label>
                                    <select
                                        id="rowSelect"
                                        value={selectedRow?.id || ""}
                                        onChange={(e) => handleRowSelect(Number(e.target.value))}
                                    >
                                        <option value="" disabled>Select a row</option>
                                        {rows1.map((row) => (
                                            <option key={row.id} value={row.id}>{row.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {selectedRow && (
                                    <button className={cls.deselectButton} onClick={() => setSelectedRow(null)}>
                                        Deselect Row
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Cells Table */}
                        {selectedRow && (
                            <div className={cls.gridContainer}>
                            <table className={cls.grid}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        {columns.map((col) => (
                                            <th key={col}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => (
                                        <tr key={row}>
                                            <td className={cls.rowLabel}>{row}</td>
                                            {columns.map((col) => (
                                                <td
                                                    key={`${row}${col}`}
                                                    className={`${cls.cell} ${
                                                        selectedCell && selectedCell.content === cellData[`${row}${col}`]?.content
                                                            ? cls.selected
                                                            : ""
                                                    }`}
                                                    onClick={() => handleCellClick(row, col)}
                                                    onMouseEnter={() => handleMouseEnter(row, col)}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    {row === "H" && col === 6 && <div className={cls.highlight}></div>}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                
                            {/* Hover Tooltip */}
                            {hoveredCell && (
                                <div className={cls.tooltip}>
                                    <p><strong>Content:</strong> {hoveredCell.content}</p>
                                    <p><strong>Quantity:</strong> {hoveredCell.quantity}</p>
                                </div>
                            )}
                
                            {/* Selected Cell Info */}
                            {selectedCell && (
                                <div className={cls.selectedInfo}>
                                    <h2>Selected Cell Details:</h2>
                                    <p><strong>Content:</strong> {selectedCell.content}</p>
                                    <p><strong>Quantity:</strong> {selectedCell.quantity}</p>
                                </div>
                            )}
                        </div>
                        )}                
                </div>
            </main>  
        </div>
    );
};

export default Raiting;
