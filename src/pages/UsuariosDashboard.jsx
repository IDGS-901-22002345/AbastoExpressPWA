import React, { useState } from "react";
import { Trash2, Edit, UserPlus, Save, PlusCircle } from "lucide-react"; // Importaciones limpias. Íconos específicos movidos abajo.

const UsuariosDashboard = () => {
  const initialUsers = [
    {
      id: crypto.randomUUID(),
      name: "Juan Pérez",
      email: "juan.perez@abarrotera.com",
      role: "Administrador",
    },
    {
      id: crypto.randomUUID(),
      name: "María López",
      email: "maria.lopez@abarrotera.com",
      role: "Vendedor",
    },
    {
      id: crypto.randomUUID(),
      name: "Carlos Ruiz",
      email: "carlos.ruiz@abarrotera.com",
      role: "Inventario",
    },
  ];
  const [users, setUsers] = useState(initialUsers);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
    role: "Vendedor",
  });

  const roles = ["Administrador", "Vendedor", "Inventario"];

  // Maneja el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Crear/Actualizar Usuario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser.name || !currentUser.email) return;

    if (isEditing) {
      // Actualizar
      setUsers(
        users.map((user) => (user.id === currentUser.id ? currentUser : user))
      );
      setIsEditing(false);
    } else {
      // Crear
      const newUser = { ...currentUser, id: crypto.randomUUID() };
      setUsers([...users, newUser]);
    }
    // Limpiar formulario
    setCurrentUser({ id: null, name: "", email: "", role: "Vendedor" });
  };

  // Editar (Cargar datos al formulario)
  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser({ ...user });
  };

  // Eliminar
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Cancelar edición
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentUser({ id: null, name: "", email: "", role: "Vendedor" });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2">
        Gestión de Usuarios
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Creación/Edición */}
        <div className="lg:col-span-1 bg-green-50 p-6 rounded-xl shadow-lg border border-green-200 h-fit">
          <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            {isEditing ? (
              <Edit size={20} className="mr-2" />
            ) : (
              <UserPlus size={20} className="mr-2" />
            )}
            {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
                placeholder="Nombre completo"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                Rol
              </label>
              <select
                name="role"
                value={currentUser.role}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
              >
                {isEditing ? (
                  <Save size={18} className="mr-2" />
                ) : (
                  <PlusCircle size={18} className="mr-2" />
                )}
                {isEditing ? "Guardar Cambios" : "Agregar Usuario"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabla de Usuarios */}
        <div className="lg:col-span-2 overflow-x-auto">
          <div className="bg-white rounded-xl shadow-lg border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-medium 
                                                ${
                                                  user.role === "Administrador"
                                                    ? "bg-red-100 text-red-800"
                                                    : user.role === "Vendedor"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-green-600 hover:text-green-900 mx-2 p-1 rounded-full hover:bg-green-100 transition"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 mx-2 p-1 rounded-full hover:bg-red-100 transition"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No hay usuarios registrados. Agrega uno nuevo.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuariosDashboard;
