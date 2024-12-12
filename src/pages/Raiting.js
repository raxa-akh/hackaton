import React, { useState } from "react";
import cls from "../styles/Raiting.module.css";
import Header from "../components/HeaderComponent/Header";

const Raiting = () => {
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const warehouses = [
        { id: 1, name: "Warehouse A" },
        { id: 2, name: "Warehouse B" },
        { id: 3, name: "Warehouse C" },
    ];

    const rows = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}` }));

    const cells = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        content: `Item ${i + 1}`,
        quantity: Math.floor(Math.random() * 100),
    }));

    const handleWarehouseSelect = (warehouseId) => {
        if (selectedWarehouse?.id !== warehouseId) {
            setSelectedWarehouse(warehouses.find(w => w.id === warehouseId));
            setSelectedRow(null); // Reset row selection if warehouse changes
        } else {
            setSelectedWarehouse(null);
            setSelectedRow(null);
        }
    };

    const handleRowSelect = (rowId) => {
        if (!selectedWarehouse) return; // Prevent row selection without warehouse
        setSelectedRow(selectedRow?.id === rowId ? null : rows.find(r => r.id === rowId));
    };

    return (
        <div>
            <Header/>
            <main className={cls.main}>
                <div className={cls.container}>
                <h1>Warehouse Management</h1>

                    {/* Warehouse Dropdown */}
                    <div className={cls.dropdownContainer}>
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
                        {selectedWarehouse && (
                            <button className={cls.deselectButton} onClick={() => handleWarehouseSelect(selectedWarehouse.id)}>
                                Deselect Warehouse
                            </button>
                        )}
                    </div>

                    {/* Row Dropdown */}
                    {selectedWarehouse && (
                        <div className={cls.dropdownContainer}>
                            <label htmlFor="rowSelect">Select Row:</label>
                            <select
                                id="rowSelect"
                                value={selectedRow?.id || ""}
                                onChange={(e) => handleRowSelect(Number(e.target.value))}
                            >
                                <option value="" disabled>Select a row</option>
                                {rows.map((row) => (
                                    <option key={row.id} value={row.id}>{row.name}</option>
                                ))}
                            </select>
                            {selectedRow && (
                                <button className={cls.deselectButton} onClick={() => setSelectedRow(null)}>
                                    Deselect Row
                                </button>
                            )}
                        </div>
                    )}

                    {/* Cells Table */}
                    {selectedRow && (
                        <div className={cls.cellTable}>
                            <h2>Cells in {selectedRow.name}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Cell ID</th>
                                        <th>Content</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cells.map((cell) => (
                                        <tr key={cell.id}>
                                            <td>{cell.id}</td>
                                            <td>{cell.content}</td>
                                            <td>{cell.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}                
                </div>
            </main>  
        </div>
    );
};

export default Raiting;
