  import React from "react";
  import TextField from "material-ui/TextField";
  import RaisedButton from "material-ui/RaisedButton";

  export default class EventForm extends React.Component {
    state = {
      Event_id: "E-" + Math.floor(Math.random() * 10000000 + 1),
      TravelPlan_id: localStorage.getItem('TravelPlan_id_Contoller'),
      event_name: "",
      event_type: "",
      description: "",
      event_location: "",
      month_reported_in_table1: "",
      duration: "",
      event_status: "",
      travel_group: "",
      p6_uniqueid: "",
      weekNo: "",
      meeting_date: "",
      expected_meeting_date: "",

      event_iderror: "",
      event_nameerror: "",
      event_typeerror: "",
      descriptionerror: "",
      event_locationerror: "",
      month_reported_in_table1error: "",
      durationerror: "",
      event_statuserror: "",
      travel_grouperror: "",
      p6_uniqueiderror: "",
      weekNoerror: "",
      meeting_dateerror: "",
      expected_meeting_dateerror: ""
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
        event_iderror: "",
        event_nameerror: "",
        event_typeerror: "",
        descriptionerror: "",
        event_locationerror: "",
        month_reported_in_table1error: "",
        durationerror: "",
        event_statuserror: "",
        travel_grouperror: "",
        p6_uniqueiderror: "",
        weekNoerror: "",
        meeting_dateerror: "",
        expected_meeting_dateerror: ""
      };

      if (this.state.Event_id.length < 3) {
        isError = true;
        errors.event_iderror = "Event_id needs to be atleast 3 characters long";
      }

      if (this.state.event_name.length < 3) {
        isError = true;
        errors.event_nameerror =
          "Event_name needs to be atleast 3 characters long";
      }

      if (this.state.event_type.length < 5) {
        isError = true;
        errors.event_typeerror =
          "Event_type needs to be atleast 5 characters long";
      }

      if (this.state.event_name.length < 3) {
        isError = true;
        errors.event_nameerror =
          "Event_name needs to be atleast 5 characters long";
      }

      if (this.state.description.length < 5) {
        isError = true;
        errors.descriptionerror =
          "Description needs to be atleast 5 characters long";
      }

      if (this.state.event_location.length < 1) {
        isError = true;
        errors.event_locationerror = "Event Location cannot be empty";
      }
      if (this.state.month_reported_in_table1.length < 2) {
        isError = true;
        errors.month_reported_in_table1error = "Cannot be empty";
      }

      if (this.state.duration.length < 1) {
        isError = true;
        errors.durationerror = "Duration cannot be empty";
      }

      if (this.state.event_status.length < 3) {
        isError = true;
        errors.event_statuserror = "Event Status cannot be empty";
      }
      if (this.state.travel_group.length < 3) {
        isError = true;
        errors.travel_grouperror = "Travel Grpup cannot be empty";
      }

      if (this.state.p6_uniqueid.length < 1) {
        isError = true;
        errors.p6_uniqueiderror = "Field cannot be cannot be empty";
      }
      if (this.state.weekNo.length < 1) {
        isError = true;
        errors.weekNoerror = "Field cannot be empty";
      }
      if (this.state.meeting_date.length < 1) {
        isError = true;
        errors.meeting_dateerror = "Field cannot be empty";
      }
      if (this.state.expected_meeting_date.length < 1) {
        isError = true;
        errors.expected_meeting_dateerror = "Field cannot be empty";
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
        this.setState({ val: (this.state.val += 1) });
        this.props.onSubmit(this.state);
        // clear form
        this.setState({
          Event_id: "",
          TravelPlan_id: "",
          event_name: "",
          event_type: "",
          description: "",
          event_location: "",
          month_reported_in_table1: "",
          duration: "",
          event_status: "",
          travel_group: "",
          p6_uniqueid: "",
          weekNo: "",
          meeting_date: "",
          expected_meeting_date: "",

          event_iderror: "",
          event_nameerror: "",
          event_typeerror: "",
          descriptionerror: "",
          event_locationerror: "",
          month_reported_in_table1error: "",
          durationerror: "",
          event_statuserror: "",
          travel_grouperror: "",
          p6_uniqueiderror: "",
          weekNoerror: "",
          meeting_dateerror: "",
          expected_meeting_dateerror: ""
        });

        var data = {
          Event_id: this.state.Event_id,
          TravelPlan_id: this.state.TravelPlan_id,
          event_name: this.state.event_name,
          event_type: this.state.event_type,
          description: this.state.description,
          event_location: this.state.event_location,
          month_reported_in_table1: this.state.month_reported_in_table1,
          duration: this.state.duration,
          event_status: this.state.event_status,
          travel_group: this.state.travel_group,
          p6_uniqueid: this.state.p6_uniqueid,
          weekNo: this.state.weekNo,
          meeting_date: this.state.meeting_date,
          expected_meeting_date: this.state.expected_meeting_date
        };
        console.log(data);

        fetch("users/event/new", {
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
            name="Event_id"
            hintText="Please insert event"
            floatingLabelText="Event_id"
            value={this.state.Event_id}
            errorText={this.state.event_iderror}
            floatingLabelFixed
          />
            <div class="divider"/>

          <TextField
            name="TravelPlan_id"
            hintText="Please insert TravelPlan id"
            floatingLabelText="Travel Plan id"
            value={this.state.TravelPlan_id}
            onChange={e => this.change(e)}
            floatingLabelFixed
          />
            <div class="divider"/>

          <TextField
            name="event_name"
            hintText="Please insert event name"
            floatingLabelText="Event Name"
            value={this.state.event_name}
            onChange={e => this.change(e)}
            errorText={this.state.event_nameerror}
            floatingLabelFixed
          />
            <div class="divider"/>
          <TextField
            name="event_type"
            hintText="Please put appropriate type"
            floatingLabelText="Event Type"
            value={this.state.event_type}
            onChange={e => this.change(e)}
            errorText={this.state.event_typeerror}
            floatingLabelFixed
          />
            <div class="divider"/>
          <TextField
            name="description"
            hintText="Description"
            floatingLabelText="Event Description"
            value={this.state.description}
            onChange={e => this.change(e)}
            errorText={this.state.descriptionerror}
            floatingLabelFixed
          />
            <div class="divider"/>
          <TextField
            name="event_location"
            hintText="Event Location"
            floatingLabelText="Event Location"
            value={this.state.event_location}
            onChange={e => this.change(e)}
            errorText={this.state.event_locationerror}
            floatingLabelFixed
          />
            <div class="divider"/>
          <TextField
            name="month_reported_in_table1"
            hintText="Month Reported in Table 1"
            floatingLabelText="Month Reported"
            value={this.state.month_reported_in_table1}
            onChange={e => this.change(e)}
            errorText={this.state.month_reported_in_table1error}
            floatingLabelFixed
          />
            <div class="divider"/>
          <TextField
            name="duration"
            hintText="Event Duration"
            floatingLabelText="Event Duration"
            value={this.state.duration}
            onChange={e => this.change(e)}
            errorText={this.state.durationerror}
            floatingLabelFixed
          />
            <div class="divider"/>
          <TextField
            name="event_status"
            hintText="Event Status"
            floatingLabelText="Event Status"
            value={this.state.event_status}
            onChange={e => this.change(e)}
            errorText={this.state.event_statuserror}
            floatingLabelFixed
          />
            <div class="divider"/>

          <TextField
            name="travel_group"
            hintText="Travel Group"
            floatingLabelText="Travel Group"
            value={this.state.travel_group}
            onChange={e => this.change(e)}
            errorText={this.state.travel_grouperror}
            floatingLabelFixed
          />
            <div class="divider"/>

          <TextField
            name="p6_uniqueid"
            hintText="P6 Unique Id"
            floatingLabelText="p6_uniqueid"
            value={this.state.p6_uniqueid}
            onChange={e => this.change(e)}
            errorText={this.state.p6_uniqueiderror}
            floatingLabelFixed
          />

            <div class="divider"/>

          <TextField
            name="weekNo"
            hintText="Week No"
            floatingLabelText="weekNo"
            value={this.state.weekNo}
            onChange={e => this.change(e)}
            errorText={this.state.weekNoerror}
            floatingLabelFixed
          />

            <div class="divider"/>

          <TextField
            name="meeting_date"
            hintText="Day Day-Month-Year"
            floatingLabelText="Meeting Date"
            value={this.state.meeting_date}
            onChange={e => this.change(e)}
            errorText={this.state.meeting_dateerror}
            floatingLabelFixed
          />

            <div class="divider"/>

          <TextField
            name="expected_meeting_date"
            hintText="Expected Meeting Date"
            floatingLabelText="Expected Meeting Date"
            value={this.state.expected_meeting_date}
            onChange={e => this.change(e)}
            errorText={this.state.expected_meeting_dateerror}
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
