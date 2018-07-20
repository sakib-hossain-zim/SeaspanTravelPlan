import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Form extends React.Component {
  state = {
    event_id: "",
    event_name: "",
    event_type: "",
    description: "",
    event_location: "",
    event_date: "",
    duration: "",
    event_status: "",
    travel_group: "",
    p6_uniqueid: "",

    event_iderror: "",
    event_nameerror: "",
    event_typeerror: "",
    descriptionerror: "",
    event_locationerror: "",
    event_dateerror: "",
    durationerror: "",
    event_statuserror: "",
    travel_grouperror: "",
    p6_uniqueiderror: ""
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
      event_dateerror: "",
      durationerror: "",
      event_statuserror: "",
      travel_grouperror: "",
      p6_uniqueiderror: ""
    };

    if (this.state.event_id.length < 5) {
      isError = true;
      errors.event_iderror = "Event_id needs to be atleast 5 characters long";
    }

    if (this.state.event_name.length < 5) {
      isError = true;
      errors.event_nameerror = "Event_name needs to be atleast 5 characters long";
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
        event_id: "",
        event_name: "",
        event_type: "",
        description: "",
        event_location: "",
        event_date: "",
        duration: "",
        event_status: "",
        travel_group: "",
        p6_uniqueid: "",

        event_iderror: "",
        event_nameerror: "",
        event_typeerror: "",
        descriptionerror: "",
        event_locationerror: "",
        event_dateerror: "",
        durationerror: "",
        event_statuserror: "",
        travel_grouperror: "",
        p6_uniqueiderror: ""
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="event_id"
          hintText="Event_id"
          floatingLabelText="Event_id"
          value={this.state.event_id}
          onChange={e => this.change(e)}
          errorText={this.state.event_iderror}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="event_name"
          hintText="Event Name"
          floatingLabelText="Event Name"
          value={this.state.event_name}
          onChange={e => this.change(e)}
          errorText={this.state.event_nameerror}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="event_type"
          hintText="Event Type"
          floatingLabelText="Event Type"
          value={this.state.event_type}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="description"
          hintText="Description"
          floatingLabelText="Event Description"
          value={this.state.description}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="event_location"
          hintText="Event Location"
          floatingLabelText="Event Location"
          value={this.state.event_location}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="event_date"
          hintText="Event Date"
          floatingLabelText="Event Date"
          value={this.state.event_date}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="event_duration"
          hintText="Event Duration"
          floatingLabelText="Event Duration"
          value={this.state.duration}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="event_status"
          hintText="Event Status"
          floatingLabelText="Event Status"
          value={this.state.event_status}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />

        <TextField
          name="travel_group"
          hintText="Travel Group"
          floatingLabelText="Travel Group"
          value={this.state.travel_group}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />

        <TextField
          name="p6_uniqueid"
          hintText="P6 Unique Id"
          floatingLabelText="p6_uniqueid"
          value={this.state.p6_uniqueid}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <br />


        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }
}
