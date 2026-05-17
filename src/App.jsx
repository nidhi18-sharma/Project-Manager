import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import Sidebar from "./components/sidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],  
  });

  function handleProject() {
    setProjectState((prevProj) => ({
      ...prevProj,
      selectedProjectId: null,
    }));
  }

  function handleAddProject(projectData) {
    setProjectState((prevProj) => ({
      ...prevProj,
      selectedProjectId: undefined,
      projects: [...prevProj.projects, { ...projectData, id: Math.random() }],
    }));
  }

  function handleDelete() {
    setProjectState((prevProj) => ({
      ...prevProj,
      selectedProjectId: undefined,
      projects: prevProj.projects.filter(
        (proj) => proj.id !== prevProj.selectedProjectId
      ),
    }));
  }

  function handleCancel() {
    setProjectState((prevProj) => ({
      ...prevProj,
      selectedProjectId: undefined,
    }));
  }

  function handleProjectSelected(id) {
    setProjectState((prevProj) => ({
      ...prevProj,
      selectedProjectId: id,
    }));
  }

  function handleAddTask(text) {
    setProjectState((prevProj) => ({
      ...prevProj,  // ✅ no selectedProjectId reset
      tasks: [
        { text, projectId: prevProj.selectedProjectId, id: Math.random() },
        ...prevProj.tasks,
      ],
    }));
  }

  function handleDeleteTask(taskId) {
    setProjectState((prevProj) => ({
      ...prevProj,
      tasks: prevProj.tasks.filter((task) => task.id !== taskId),
    }));
  }

  const selectedProjectSidebar = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );


  const tasksForSelectedProject = projectState.tasks.filter(
    (task) => task.projectId === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProjectSidebar}
      onDelete={handleDelete}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={tasksForSelectedProject}  
    />
  );

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onSelectProj={handleProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onSelectProj={handleProject}
        projects={projectState.projects}
        onSelectProject={handleProjectSelected}
      />
      {content}
    </main>
  );
}

export default App;