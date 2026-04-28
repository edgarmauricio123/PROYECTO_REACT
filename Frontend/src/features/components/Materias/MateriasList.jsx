import "../Materias/MateriasList.css";
function MateriasList() {
  return (
    <div className="contentdashboard">
      <table
        className="table"
        style={{ backgroundColor: "#6366f1", borderRadius: "10px 20px 0 0" }}
      >
        {" "}
        <thead className="table-light">
          <th scope="col">Id</th>
          <th scope="col">Creditos</th>
          <th scope="col">Semestre</th>
          <th scope="col">Nombre</th>
          <th scope="col">Acciones</th>
        </thead>
        <tbody>...</tbody>
      </table>
    </div>
  );
}

export default MateriasList;
