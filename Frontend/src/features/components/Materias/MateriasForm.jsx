import "../Materias/MateriasForm.css";

function MateriasForm() {
  return (
    <div className="materias-form-container">

    <div className="contentdashboard">
      <form className="form">
        <p className="title">Registrar Materias </p>
        <div className="flex">
          <label>
            <input className="input" type="number" placeholder="" required="" />
            <span>Creditos</span>
          </label>

          <label>
            <input className="input" type="text" placeholder="" required="" />
            <span>Semestre</span>
          </label>
        </div>

        <label>
          <input className="input" type="text" placeholder="" required="" />
          <span>Nombre</span>
        </label>
        <button className="submit">Enviar</button>
      
      </form>
    </div>
    </div>
  );
}

export default MateriasForm;