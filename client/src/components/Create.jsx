import { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({ name: "", position: "", level: "" });
    navigate("/");
  }
  // This following section will display the form that takes the input from the user.
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-600"
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Level
          </label>
          <div className="flex">
            {["Intern", "Junior", "Senior"].map((level) => (
              <div key={level} className="mr-4">
                <input
                  type="radio"
                  id={`position${level}`}
                  value={level}
                  checked={form.level === level}
                  onChange={(e) => updateForm({ level: e.target.value })}
                  className="form-radio text-indigo-600"
                />
                <label
                  htmlFor={`position${level}`}
                  className="ml-2 text-sm text-gray-600"
                >
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            value="Create person"
            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-700"
          >
            Create person
          </button>
        </div>
      </form>
    </div>
  );
}
