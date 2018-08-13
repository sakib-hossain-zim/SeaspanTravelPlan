import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class BudgetForm extends React.Component {
  state = {
    Budget_id: "B-" + Math.floor(Math.random() * 10000000 + 1),
    TravelPlan_id: "",
    VSY_IndexNo: "",
    VSY_Meeting_Group_Desription : "",
    milestone : "",
    description : "",
    traveller_company : "",
    from_location : "",
    to_location : "",
    travel_status_days : "",
    traveller_name : "",
    traveller_labor_category : "",
    estimated_labor_travel_time : "",
    comments : "",


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

  onSubmit = e => {
      e.preventDefault();

      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        Budget_id: "",
        TravelPlan_id: "",
        VSY_IndexNo: "",
        VSY_Meeting_Group_Desription : "",
        milestone : "",
        description : "",
        traveller_company : "",
        from_location : "",
        to_location : "",
        travel_status_days : "",
        traveller_name : "",
        traveller_labor_category : "",
        estimated_labor_travel_time : "",
        comments : "",


        // event_iderror: "",
        // event_nameerror: "",
        // event_typeerror: "",
        // descriptionerror: "",
        // event_locationerror: "",
        // month_reported_in_table1error: "",
        // durationerror: "",
        // event_statuserror: "",
        // travel_grouperror: "",
        // p6_uniqueiderror: "",
        // weekNoerror: "",
        // meeting_dateerror: "",
        // expected_meeting_dateerror: ""
      });

      var data = {
        Budget_id: this.state.Budget_id,
        TravelPlan_id: this.state.TravelPlan_id,
        VSY_IndexNo: this.state.VSY_IndexNo,
        VSY_Meeting_Group_Desription : this.state.VSY_Meeting_Group_Desription,
        milestone : this.state.milestone,
        description : this.state.description,
        traveller_company : this.state.traveller_company,
        from_location : this.state.from_location,
        to_location : this.state.to_location,
        travel_status_days : this.state.travel_status_days,
        traveller_name : this.state.traveller_name,
        traveller_labor_category : this.state.traveller_labor_category,
        estimated_labor_travel_time : this.state.estimated_labor_travel_time,
        comments : this.state.comments,

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
        });

  };

  render() {
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
          name="TravelPlan_id"
          hintText="Please insert Travel Plan Id"
          floatingLabelText="TravelPlan_id"
          value={this.state.TravelPlan_id}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="VSY_IndexNo"
          hintText="Please insert VSY_IndexNo"
          floatingLabelText="VSY Index no"
          value={this.state.VSY_IndexNo}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="VSY_Meeting_Group_Desription"
          hintText="VSY_Meeting_Group_Desription"
          floatingLabelText="VSY_Meeting_Group_Desription"
          value={this.state.VSY_Meeting_Group_Desription}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="milestone"
          hintText="Please insert milestone"
          floatingLabelText="milestone"
          value={this.state.milestone}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="description"
          hintText="Description"
          floatingLabelText="Description"
          value={this.state.description}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="traveller_company"
          hintText="Traveller Company"
          floatingLabelText="Traveller Company"
          value={this.state.traveller_company}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="from_location"
          hintText="Source Location"
          floatingLabelText="Source Location"
          value={this.state.from_location}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
      <div class="divider"/>
        <TextField
          name="to_location"
          hintText="To Location"
          floatingLabelText="To Location"
          value={this.state.to_location}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="travel_status_days"
          hintText="Travel Status Days"
          floatingLabelText="Travel Status Days"
          value={this.state.travel_status_days}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="traveller_name"
          hintText="Name"
          floatingLabelText="Name"
          value={this.state.traveller_name}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="traveller_labor_category"
          hintText="Labor Category"
          floatingLabelText="Labor Category"
          value={this.state.traveller_labor_category}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />

        <div class="divider"/>

        <TextField
          name="estimated_labor_travel_time"
          hintText="Estimated Labor Travel Time Cost"
          floatingLabelText="Estimated Labor Travel Time Cost"
          value={this.state.estimated_labor_travel_time}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />

        <div class="divider"/>

        <TextField
          name="comments"
          hintText="Comments"
          floatingLabelText="Comments"
          value={this.state.comments}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />




        <br />
        <br />

        <div className="box-submit">
        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary/>
        </div>

      </form>
    );
  }
}
