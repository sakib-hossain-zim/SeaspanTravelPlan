import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Modal from "react-responsive-modal";

export default class BudgetForm extends React.Component {
  state = {
    Budget_id: "B-" + Math.floor(Math.random() * 10000000 + 1),
    TravelPlan_id: localStorage.getItem('BudgetSelection_TravelPlan_id'),
    Event_id: localStorage.getItem('BudgetSelection_Event_id'),
    VSY_IndexNo: localStorage.getItem('BudgetSelection_VSY_IndexNo'),
    travel_program: localStorage.getItem('BudgetSelection_TravelProgram'),
    budget_creation_date: "",
    travel_status_days : "",
    traveller_name : localStorage.getItem('BudgetSelection_TravellerName'),
    event_name: localStorage.getItem('BudgetSelection_EventName'),
    event_start_date: localStorage.getItem('BudgetSelection_EventStartDate'),
    event_end_date: localStorage.getItem('BudgetSelection_EventEndDate'),
    travel_start_date: localStorage.getItem('BudgetSelection_TravelStartDate'),
    travel_end_date: localStorage.getItem('BudgetSelection_TravelEndDate'),
    modalIsOpen: false,



    // Budget_iderror: "",
    // TravelPlan_iderror: "",
    // VSY_IndexNoerror: "",
    // VSY_Meeting_Group_Desriptionerror : "",
    // milestoneerror : "",
    // descriptionerror : "",
    // traveller_companyerror : "",
    // from_locationerror : "",
    // to_locationerror : "",
    // travel_status_dayserror : "",
    // traveller_nameerror : "",
    // traveller_labor_categoryerror : "",
    // estimated_labor_travel_timeerror : "",
    // commentserror : "",
    // accomodation_costerror : "",
    // car_rental_costerror : "",
    // per_diem_costerror: "",
    // flight_or_car_costerror : "",
    // taxi_mileage_gaserror : "",
    // totalerror : "",
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // validate = () => {
  //   let isError = false;
  //   const errors = {
  //     Budget_iderror: "",
  //     TravelPlan_iderror: "",
  //     VSY_IndexNoerror: "",
  //     VSY_Meeting_Group_Desriptionerror : "",
  //     milestoneerror : "",
  //     descriptionerror : "",
  //     traveller_companyerror : "",
  //     from_locationerror : "",
  //     to_locationerror : "",
  //     travel_status_dayserror : "",
  //     traveller_nameerror : "",
  //     traveller_labor_categoryerror : "",
  //     estimated_labor_travel_timeerror : "",
  //     commentserror : "",
  //     accomodation_costerror : "",
  //     car_rental_costerror : "",
  //     per_diem_costerror: "",
  //     flight_or_car_costerror : "",
  //     taxi_mileage_gaserror : "",
  //     totalerror : "",
  //   };
  //
  //   if (this.state.Budget_id.length < 1) {
  //     isError = true;
  //     errors.Budget_iderror = "Budget_id cannot be empty";
  //   }
  //
  //   if (this.state.TravelPlan_id.length < 1) {
  //     isError = true;
  //     errors.event_nameerror =
  //       "TravelPlan_id cannot be empty";
  //   }
  //
  //   if (this.state.VSY_IndexNo.length < 1) {
  //     isError = true;
  //     errors.event_typeerror =
  //       "needs to be atleast 5 characters long";
  //   }
  //
  //   if (this.state.event_name.length < 3) {
  //     isError = true;
  //     errors.event_nameerror =
  //       "Event_name needs to be atleast 5 characters long";
  //   }
  //
  //   if (this.state.description.length < 5) {
  //     isError = true;
  //     errors.descriptionerror =
  //       "Description needs to be atleast 5 characters long";
  //   }
  //
  //   if (this.state.event_location.length < 1) {
  //     isError = true;
  //     errors.event_locationerror = "Event Location cannot be empty";
  //   }
  //   if (this.state.month_reported_in_table1.length < 2) {
  //     isError = true;
  //     errors.month_reported_in_table1error = "Cannot be empty";
  //   }
  //
  //   if (this.state.duration.length < 1) {
  //     isError = true;
  //     errors.durationerror = "Duration cannot be empty";
  //   }
  //
  //   if (this.state.event_status.length < 3) {
  //     isError = true;
  //     errors.event_statuserror = "Event Status cannot be empty";
  //   }
  //   if (this.state.travel_group.length < 3) {
  //     isError = true;
  //     errors.travel_grouperror = "Travel Grpup cannot be empty";
  //   }
  //
  //   if (this.state.p6_uniqueid.length < 1) {
  //     isError = true;
  //     errors.p6_uniqueiderror = "Field cannot be cannot be empty";
  //   }
  //   if (this.state.weekNo.length < 1) {
  //     isError = true;
  //     errors.weekNoerror = "Field cannot be empty";
  //   }
  //   if (this.state.meeting_date.length < 1) {
  //     isError = true;
  //     errors.meeting_dateerror = "Field cannot be empty";
  //   }
  //   if (this.state.expected_meeting_date.length < 1) {
  //     isError = true;
  //     errors.expected_meeting_dateerror = "Field cannot be empty";
  //   }
  //
  //   this.setState({
  //     ...this.state,
  //     ...errors
  //   });
  //
  //   return isError;
  // };


  openModal= () => {

    this.setState({
      modalIsOpen: true,
    });

  }

  onSubmit = e => {
      e.preventDefault();

      var self = this;

      this.props.onSubmit(this.state);


      localStorage.setItem('Budget_id', this.state.Budget_id);

      var date1 = new Date(this.state.travel_start_date);
      console.log(this.state.travel_start_date)
      console.log(date1);
      var date2 = new Date(this.state.travel_end_date);
      var diffDays = this.dateDiffInDays(date1,date2);



      var today= new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      if(dd<10){
        dd= '0'+dd
      }
      if(mm<10){
        mm = '0'+ mm
      }

      today = yyyy + '-'+mm+'-'+dd;
      var today_date = today.toString();

      var date1 = new Date(this.state.travel_start_date);
      console.log(this.state.travel_start_date)
      console.log(date1);
      var date2 = new Date(this.state.travel_end_date);
      var diffDays = this.dateDiffInDays(date1,date2);


      var data = {
        Budget_id: this.state.Budget_id,
        TravelPlan_id: this.state.TravelPlan_id,
        Event_id: this.state.Event_id,
        VSY_IndexNo: this.state.VSY_IndexNo,
        travel_status_days : diffDays,
        traveller_name : this.state.traveller_name,
        budget_creation_date: today_date

      };
      console.log(data);

      fetch("users/budget/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        })
        .catch(function(err) {
          console.log(err);
        })
        .then(function(){
           self.openModal();
        });

  };

  dateDiffInDays(a , b){
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
}

  render() {
    var date1 = new Date(this.state.travel_start_date);
    console.log(this.state.travel_start_date)
    console.log(date1);
    var date2 = new Date(this.state.travel_end_date);
    var diffDays = this.dateDiffInDays(date1,date2);



    var today= new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10){
      dd= '0'+dd
    }
    if(mm<10){
      mm = '0'+ mm
    }

    today = yyyy + '-'+mm+'-'+dd;
    var today_date = today.toString();



    return (
      <form>
        <TextField
          name="Budget_id"
          hintText="Please insert Budget_id"
          floatingLabelText="Budget Id"
          value={this.state.Budget_id}
          floatingLabelFixed
        />
        <div class="divider"/>


        <TextField
          name="budget_creation_date"
          floatingLabelText="Budget Creation Date"
          value={today_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="VSY_IndexNo"
          floatingLabelText="Traveller ID No"
          value={this.state.VSY_IndexNo}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="traveller_name"
          floatingLabelText="Traveller Name"
          value={this.state.traveller_name}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="TravelPlan_id"
          floatingLabelText="Travel Plan ID"
          value={this.state.TravelPlan_id}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="travel_program"
          floatingLabelText="Travel Program"
          value={this.state.travel_program}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="Event_id"
          floatingLabelText="Event ID"
          value={this.state.Event_id}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="event_name"
          floatingLabelText="Event Name"
          value={this.state.event_name}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="event_start_date"
          floatingLabelText="Event Start Date"
          value={this.state.event_start_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
      <div class="divider"/>
        <TextField
          name="event_end_date"
          floatingLabelText="Event End Date"
          value={this.state.event_end_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="travel_start_date"
          floatingLabelText="Travel Start Date"
          value={this.state.travel_start_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="travel_end_date"
          floatingLabelText="Travel End Date"
          value={this.state.travel_end_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="travel_status_days"
          floatingLabelText="Travel Status Days"
          value={diffDays}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />


        <br />
        <br />

        <div className="box-submit">
        <RaisedButton label="Confirm" onClick={e => this.onSubmit(e)} primary/>
        </div>

        <Modal
          open={this.state.modalIsOpen}
          center
        >
        <br />


        <div><p>Click "OK" to proceed to Approval page.</p></div>
        <br />
        <br />

        <button  type= "submit"  >
        <a href= '/createBudget' class="text-muted"> OK </a>
        </button>

        </Modal>

      </form>



    );
  }
}
