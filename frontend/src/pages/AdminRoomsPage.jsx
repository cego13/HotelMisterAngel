import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/AdminRoomsPage.css";

const AdminRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editedRoom, setEditedRoom] = useState({
    nombre: '',
    precioPorNoche: '',
    capacidad: '',
    disponibilidad: true,
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/habitaciones', {
          headers: { Authorization: token },
        });

        if (res.status === 401 || res.status === 403) {
          navigate('/');
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          console.warn('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
        navigate('/');
      }
    };

    fetchRooms();
  }, [token, navigate]);

  const handleEdit = (room) => {
    setEditingRoomId(room._id);
    setEditedRoom({
      nombre: room.nombre,
      precioPorNoche: room.precioPorNoche,
      capacidad: room.capacidad,
      disponibilidad: room.disponibilidad,
    });
  };

  const handleCancel = () => {
    setEditingRoomId(null);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/habitaciones/${editingRoomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(editedRoom),
      });

      if (res.ok) {
        setEditingRoomId(null);
        const updatedRooms = rooms.map(room =>
          room._id === editingRoomId ? { ...room, ...editedRoom } : room
        );
        setRooms(updatedRooms);
      } else {
        alert('Error al guardar los cambios');
      }
    } catch (error) {
      console.error('Error al guardar habitación:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
      const res = await fetch(`http://localhost:5000/api/admin/habitaciones/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });

      if (res.ok) {
        setRooms(rooms.filter(room => room._id !== id));
        alert('Habitación eliminada');
      } else {
        alert('Error al eliminar la habitación');
      }
    }
  };

  const handleCreate = () => {
    navigate('/admin/habitaciones/crear');
  };

  return (
    <div className="admin-rooms-page">
      <button onClick={() => navigate('/')} className="back-button">🏠 Volver al Home</button>
      <h2>Lista de Habitaciones</h2>
      <button className="create-room-button" onClick={handleCreate}>Crear Nueva Habitación</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio por Noche</th>
            <th>Capacidad</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room._id}>
              {editingRoomId === room._id ? (
                <>
                  <td>
                    <input
                      value={editedRoom.nombre}
                      onChange={(e) => setEditedRoom({ ...editedRoom, nombre: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedRoom.precioPorNoche}
                      onChange={(e) => setEditedRoom({ ...editedRoom, precioPorNoche: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedRoom.capacidad}
                      onChange={(e) => setEditedRoom({ ...editedRoom, capacidad: e.target.value })}
                    />
                  </td>
                  <td>
                    <select
                      value={editedRoom.disponibilidad}
                      onChange={(e) => setEditedRoom({ ...editedRoom, disponibilidad: e.target.value === 'true' })}
                    >
                      <option value="true">Disponible</option>
                      <option value="false">No Disponible</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{room.nombre}</td>
                  <td>{room.precioPorNoche}</td>
                  <td>{room.capacidad}</td>
                  <td>{room.disponibilidad ? 'Disponible' : 'No Disponible'}</td>
                  <td>
                    <button onClick={() => handleEdit(room)}>Editar</button>
                    <button onClick={() => handleDelete(room._id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRoomsPage;
