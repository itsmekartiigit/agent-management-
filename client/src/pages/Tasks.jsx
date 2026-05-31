import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] =
    useState({});

  const getTasks = async () => {
    const response = await fetch(
      "https://agent-management-server.vercel.app//api/tasks/list",
      {
        headers: {
          token:
            localStorage.getItem(
              "token"
            ),
        },
      }
    );

    const data =
      await response.json();

    if (data.success) {
      setTasks(data.tasks);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Distributed Tasks
      </h1>

      {Object.entries(tasks).map(
        ([agent, records]) => (
          <div
            key={agent}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <h2 className="text-xl font-semibold mb-3">
              {agent}
            </h2>

            <table className="w-full">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Phone</th>
                  <th>Notes</th>
                </tr>
              </thead>

              <tbody>
                {records.map((task) => (
                  <tr key={task._id}>
                    <td>
                      {task.firstName}
                    </td>
                    <td>
                      {task.phone}
                    </td>
                    <td>
                      {task.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

export default Tasks;