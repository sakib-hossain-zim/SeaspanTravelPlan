import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import Modal from "react-responsive-modal";


class CreateTravellerTable extends Component {


  constructor(props){
    super(props);
    this.state = {
      change_data: [],

      VSY_IndexNo: "",
      name: "",
      password: "",
      company: "",
      location: "",
      labor_category: "",
      labor_rate: "",
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(row,abcd) {

    this.setState({
      modalIsOpen: true,
      VSY_IndexNo: abcd[0],
      password: abcd[1],
      name: abcd[2],
      company: abcd[3],
      location: abcd[4],
      labor_category: abcd[5],
      labor_rate : abcd[6],

    });

  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  logChange(e) {
    this.setState({
      [e.target.name]: e.target.value //setting value edited by the admin in state.
    });
  }

  handleEdit(event) {
    //Edit functionality
    console.log("Successful");
    console.log(this.state);
    event.preventDefault();
    var data = {
      VSY_IndexNo: this.state.VSY_IndexNo,
      name: this.state.name,
      password: this.state.password,
      company: this.state.company,
      location: this.state.location,
      labor_category: this.state.labor_category,
      labor_rate: this.state.labor_rate

    };
    var self = this;
    fetch("/users/traveller/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        if (data === "success") {
          this.setState({
            msg: "User has been edited."

          });
          window.location.reload();

        }
      })
      .then(function(){
        self.setState({modalIsOpen: false})
      })
      .then(function(){
        window.location.reload()
      })
      .catch(function(err) {
        console.log(err);
      });



  }

onRowSelect = (row) => {
  var abcd = [];
  for(const prop in row){
    abcd.push(row[prop]);

    }
    this.openModal(row,abcd);

  }





  render() {
    const selectRowProp = {
      mode:"checkbox",
      clickToSelect: true,
      onSelect: this.onRowSelect
    }





    return (
      <div>
        <BootstrapTable
          data={this.props.data}
          hover
          striped
          responsive
          exportCSV
          selectRow={selectRowProp}
          csvFileName="traveller.csv"
        >
          <TableHeaderColumn isKey dataField="VSY_IndexNo" filter={{type: 'TextFilter', delay:1000}} width="150">
            VSY_IndexNo
          </TableHeaderColumn>
          <TableHeaderColumn  dataField="password" filter={{type: 'TextFilter', delay:1000}} width="150">
            Password
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" filter={{type: 'TextFilter', delay:1000}} width="150">
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="location" filter={{type: 'TextFilter', delay:1000}} width="150">
            Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="company" filter={{type: 'TextFilter', delay:1000}} width="150">
            Company
          </TableHeaderColumn>
          <TableHeaderColumn dataField="labor_category" filter={{type: 'TextFilter', delay:1000}}  width="150">
            Labor Category
          </TableHeaderColumn>
          <TableHeaderColumn dataField="labor_rate" filter={{type: 'TextFilter', delay:1000}} width="150">
            Labor Rate
          </TableHeaderColumn>




        <Modal
               open={this.state.modalIsOpen}
               onClose={this.closeModal}
               center
             >
               <form onSubmit={this.handleEdit}>
               <h3>Traveller Editor</h3>
                 <label>
                   VSY_IndexNo:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.VSY_IndexNo}
                     className="form-control"
                     name="VSY_IndexNo"
                   />
                 </label>
                 <label>
                   Password:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.password}
                     className="form-control"
                     name="password"
                   />
                 </label>
                 <label>
                   name:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.name}
                     className="form-control"
                     name="name"
                   />
                 </label>
                 <label>
                   company:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.company}
                     className="form-control"
                     name="company"
                   />
                 </label>

                 <label>
                   location:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.location}
                     className="form-control"
                     name="location"
                   />
                 </label>

                 <label>
                   Labor Category:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.labor_category}
                     className="form-control"
                     name="labor_category"
                   />
                 </label>
                 <label>
                   Labor Rate:
                   <input
                     type="text"
                     onChange={this.logChange}
                     value={this.state.labor_rate}
                     className="form-control"
                     name="labor_rate"
                   />
                 </label>



                 <div className="submit-section">
                   <button>Submit</button>
                 </div>
               </form>
             </Modal>
             </BootstrapTable>
      </div>
    );
  }
}

export default CreateTravellerTable;
