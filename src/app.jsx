const SearchbarDropDown = (props) => {
  return (
    <div className="row">
        <div className="col-3">
          <input type="text" class="form-control col-3" placeholder="Search"/>
        </div>
        <div className="col-3 border border-danger"></div>
        <div className="col-3 border border-success"></div>
        <div className="col-3 border border-dark"></div>
    </div>
    
  )
}


const Main = () => {
  return (
    <div className="row">
      <h2>Penyebaran Covid-19 di Dunia</h2>
      <SearchbarDropDown/>
    </div>
    
  )
}
ReactDOM.render(<Main/>, document.getElementById("dunia"))