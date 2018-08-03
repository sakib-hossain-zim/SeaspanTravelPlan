import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class TravelPlanForm extends React.Component {
  state = {

    TravelPlan_id: "",
    start_date: "",
    end_date: "",
    source: "",
    destination: "",
    travel_status_bool: "",
    approval_status: "",
    travel_period: "",
    contract: "",
    phase: "",
    nss_program: "",
    planned_budget: "",
    e1_business_unit: "",


    TravelPlan_iderror: "",
    start_dateerror: "",
    end_dateerror: "",
    sourceerror: "",
    destinationerror: "",
    travel_status_boolerror: "",
    approval_statuserror: "",
    travel_perioderror: "",
    contracterror: "",
    phaseerror: "",
    nss_programerror: "",
    planned_budgeterror: "",
    e1_businessuniterror: ""

  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      TravelPlan_iderror: "",
      start_dateerror: "",
      end_dateerror: "",
      sourceerror: "",
      destinationerror: "",
      travel_status_boolerror: "",
      approval_statuserror: "",
      travel_perioderror: "",
      contracterror: "",
      phaseerror: "",
      nss_programerror: "",
      planned_budgeterror: "",
      e1_businessuniterror: ""

    };

    if (this.state.TravelPlan_id.length < 1) {
      isError = true;
      errors.TravelPlan_iderror = "TravelPlan_id needs to be atleast 3 characters long";
    }

    if (this.state.start_date.length < 1) {
      isError = true;
      errors.start_dateerror =
        "Start date needs to be valid";
    }

    if (this.state.end_date.length < 2) {
      isError = true;
      errors.end_dateerror =
        "End Date needs to be valid";
    }

    if (this.state.source.length < 1) {
      isError = true;
      errors.sourceerror =
        "Source cannot be empty";
    }

    if (this.state.destination.length < 1) {
      isError = true;
      errors.destinationerror =
        "Field cannot be empty";
    }

    if (this.state.travel_status_bool.length < 1) {
      isError = true;
      errors.travel_status_boolerror = "Field cannot be empty";
    }

    if (this.state.approval_status.length < 1) {
      isError = true;
      errors.approval_statuserror = "Field cannot be empty";
    }

    if (this.state.travel_period.length < 1) {
      isError = true;
      errors.travel_perioderror = "Field cannot be empty";
    }

    if (this.state.contract.length < 1) {
      isError = true;
      errors.contracterror = "Field cannot be empty";
    }

    if (this.state.phase.length < 1) {
      isError = true;
      errors.phaseerror = "Field cannot be empty";
    }
    if (this.state.nss_program.length < 1) {
      isError = true;
      errors.nss_programerror = "Field cannot be empty";
    }

    if (this.state.planned_budget.length < 1) {
      isError = true;
      errors.planned_budgeterror = "Field cannot be empty";
    }

    if (this.state.e1_business_unit.length < 1) {
      isError = true;
      errors.e1_businessuniterror = "Field cannot be empty";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        TravelPlan_id: "",
        start_date: "",
        end_date: "",
        source: "",
        destination: "",
        travel_status_bool: "",
        approval_status: "",
        travel_period: "",
        contract: "",
        phase: "",
        nss_program: "",
        planned_budget: "",
        e1_business_unit: "",

        TravelPlan_iderror: "",
        start_dateerror: "",
        end_dateerror: "",
        sourceerror: "",
        destinationerror: "",
        travel_status_boolerror: "",
        approval_statuserror: "",
        travel_perioderror: "",
        contracterror: "",
        phaseerror: "",
        nss_programerror: "",
        planned_budgeterror: "",
        e1_businessuniterror: ""


      });

      var data = {
        TravelPlan_id: this.state.TravelPlan_id,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        source: this.state.source,
        destination: this.state.destination,
        travel_status_bool: this.state.travel_status_bool,
        approval_status: this.state.approval_status,
        travel_period: this.state.travel_period,
        contract: this.state.contract,
        phase: this.state.phase,
        nss_program: this.state.nss_program,
        planned_budget: this.state.planned_budget,
        e1_business_unit: this.state.e1_business_unit,

      };
      console.log(data);

      fetch("users/travelplan/new", {
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
    }
  };

  render() {
    return (
      <form>

        <TextField
          name="TravelPlan_id"
          hintText="Please insert TravelPlan id"
          floatingLabelText="Travel Plan id"
          value={this.state.TravelPlan_id}
          onChange={e => this.change(e)}
          errorText={this.state.TravelPlan_iderror}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="start_date"
          hintText="Please insert Start Date"
          floatingLabelText="Start Date"
          value={this.state.start_date}
          onChange={e => this.change(e)}
          errorText={this.state.start_dateerror}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="end_date"
          hintText="Please insert end date"
          floatingLabelText="End Date"
          value={this.state.end_date}
          onChange={e => this.change(e)}
          errorText={this.state.end_dateerror}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="source"
          hintText="Source"
          floatingLabelText="Source"
          value={this.state.source}
          onChange={e => this.change(e)}
          errorText={this.state.sourceerror}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="destination"
          hintText="Destination"
          floatingLabelText="Destination"
          value={this.state.destination}
          onChange={e => this.change(e)}
          errorText={this.state.destinationerror}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="travel_status_bool"
          hintText="Travel Status"
          floatingLabelText="Travel Status"
          value={this.state.travel_status_bool}
          onChange={e => this.change(e)}
          errorText={this.state.travel_status_boolerror}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="approval_status"
          hintText="Approval Status"
          floatingLabelText="Approval Status"
          value={this.state.approval_status}
          onChange={e => this.change(e)}
          errorText={this.state.approval_statuserror}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="travel_period"
          hintText="Travel Period"
          floatingLabelText="Travel Period"
          value={this.state.travel_period}
          onChange={e => this.change(e)}
          errorText={this.state.travel_perioderror}
          floatingLabelFixed
        />
        <div class="divider"/>
        <TextField
          name="contract"
          hintText="Contract"
          floatingLabelText="Contract"
          value={this.state.contract}
          onChange={e => this.change(e)}
          errorText={this.state.contracterror}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="phase"
          hintText="Phase"
          floatingLabelText="Phase"
          value={this.state.phase}
          onChange={e => this.change(e)}
          errorText={this.state.phaseerror}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="nss_program"
          hintText="NSS Program"
          floatingLabelText="NSS Program"
          value={this.state.nss_program}
          onChange={e => this.change(e)}
          errorText={this.state.nss_programerror}
          floatingLabelFixed
        />
        <div class="divider"/>

        <TextField
          name="planned_budget"
          hintText="Planned Budget"
          floatingLabelText="planned budget in dollar"
          value={this.state.planned_budget}
          onChange={e => this.change(e)}
          errorText={this.state.planned_budgeterror}
          floatingLabelFixed
        />

          <div class="divider"/>

        <TextField
          name="e1_business_unit"
          hintText="E1 Business unit"
          floatingLabelText="e1 business unit"
          value={this.state.e1_business_unit}
          onChange={e => this.change(e)}
          errorText={this.state.e1_businessuniterror}
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
