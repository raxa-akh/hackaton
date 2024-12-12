import React, { useState } from "react";
import cls from "../styles/Raiting.module.css";

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

    const handleWarehouseSelect = (warehouse) => {
        if (selectedWarehouse?.id === warehouse.id) {
            setSelectedWarehouse(null);
            setSelectedRow(null);
        } else {
            setSelectedWarehouse(warehouse);
            setSelectedRow(null);
        }
    };

    const handleRowSelect = (row) => {
        if (selectedRow?.id === row.id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(row);
        }
    };

    return (
        <div className={cls.container}>
            <main className={cls.main}></main>
                <h1>Warehouse Management</h1>

                {/* Warehouse Selection */}
                <div className={cls.warehouseSelection}>
                    {warehouses.map((warehouse) => (
                        selectedWarehouse && selectedWarehouse.id !== warehouse.id ? null : (
                            <div
                                key={warehouse.id}
                                className={`${cls.warehouse} ${
                                    selectedWarehouse?.id === warehouse.id ? cls.selected : ""
                                }`}
                                onClick={() => handleWarehouseSelect(warehouse)}
                            >
                                {warehouse.name}
                                {selectedWarehouse?.id === warehouse.id && (
                                    <button
                                        className={cls.deselectButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedWarehouse(null);
                                            setSelectedRow(null);
                                        }}
                                    >
                                        Deselect
                                    </button>
                                )}
                            </div>
                        )
                    ))}
                </div>

                {/* Row Selection */}
                {selectedWarehouse && (
                    <div className={cls.rowSelection}>
                        <h2>Rows in {selectedWarehouse.name}</h2>
                        {rows.map((row) => (
                            selectedRow && selectedRow.id !== row.id ? null : (
                                <div
                                    key={row.id}
                                    className={`${cls.row} ${
                                        selectedRow?.id === row.id ? cls.selected : ""
                                    }`}
                                    onClick={() => handleRowSelect(row)}
                                >
                                    {row.name}
                                    {selectedRow?.id === row.id && (
                                        <button
                                            className={cls.deselectButton}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedRow(null);
                                            }}
                                        >
                                            Deselect
                                        </button>
                                    )}
                                </div>
                            )
                        ))}
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
    );
};

export default Raiting;
