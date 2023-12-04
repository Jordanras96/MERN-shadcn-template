import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            position: form.position,
            level: form.level,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        navigate("/");
    }

return (
  <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Update Record</h3>
      <form onSubmit={onSubmit} className="max-w-md">
          <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                  Name:
              </label>
              <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  className="mt-1 p-2 block w-full border rounded-md bg-gray-100"
              />
          </div>
          <div className="mb-4">
              <label htmlFor="position" className="block text-sm font-medium text-gray-600">
                  Position:
              </label>
              <input
                  type="text"
                  id="position"
                  value={form.position}
                  onChange={(e) => updateForm({ position: e.target.value })}
                  className="mt-1 p-2 block w-full border rounded-md bg-gray-100"
              />
          </div>
          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Level:</label>
              <div className="mt-1 space-x-4">
                  <div className="flex items-center">
                      <input
                          type="radio"
                          id="positionIntern"
                          value="Intern"
                          checked={form.level === "Intern"}
                          onChange={(e) => updateForm({ level: e.target.value })}
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label htmlFor="positionIntern" className="ml-2 text-sm text-gray-600">
                          Intern
                      </label>
                  </div>
                  <div className="flex items-center">
                      <input
                          type="radio"
                          id="positionJunior"
                          value="Junior"
                          checked={form.level === "Junior"}
                          onChange={(e) => updateForm({ level: e.target.value })}
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label htmlFor="positionJunior" className="ml-2 text-sm text-gray-600">
                          Junior
                      </label>
                  </div>
                  <div className="flex items-center">
                      <input
                          type="radio"
                          id="positionSenior"
                          value="Senior"
                          checked={form.level === "Senior"}
                          onChange={(e) => updateForm({ level: e.target.value })}
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label htmlFor="positionSenior" className="ml-2 text-sm text-gray-600">
                          Senior
                      </label>
                  </div>
              </div>
          </div>
          <div className="mb-4">
              <button
                  type="submit"
                  className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
              >
                  Update Record
              </button>
          </div>
      </form>
  </div>
);
};

Edit.propTypes = {
    updateRecord: PropTypes.func,
};

export default Edit;
