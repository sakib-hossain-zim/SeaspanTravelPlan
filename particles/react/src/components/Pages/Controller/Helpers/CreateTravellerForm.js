import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class CreateTravellerForm extends React.Component {
  state = {
       VSY_IndexNo: "",
       name: "",
       company: "",
       location: "",
       labor_category: "",
       labor_rate: "",

       VSY_IndexNoerror: "",
       name_error: "",
       company_error: "",
       location_error: "",
       labor_category_error: "",
       labor_rate_error: "",


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
      VSY_IndexNoerror: "",
      name_error: "",
      company_error: "",
      location_error: "",
      labor_category_error: "",
      labor_rate_error: "",

    };

    if (this.state.VSY_IndexNo.length < 1) {
      isError = true;
      errors.VSY_IndexNoerror = "VSY_IndexNo cannot be empty";
    }

    if (this.state.name.length < 1) {
      isError = true;
      errors.name_error =
        "Name cannot be empty";
    }

    if (this.state.company.length < 1) {
      isError = true;
      errors.company_error =
        "Company cannot be empty";
    }

    if (this.state.location.length < 1) {
      isError = true;
      errors.location_error =
        "Location cannot be empty";
    }

    if (this.state.labor_category.length < 1) {
      isError = true;
      errors.labor_category_error =
        "Labor Category cannot be empty";
    }

    if (this.state.labor_rate.length < 1) {
      isError = true;
      errors.labor_rate_error = "Labor Rate cannot be empty";
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
      if (!err){
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        VSY_IndexNo: "",
        name: "",
        company: "",
        location: "",
        labor_category: "",
        labor_rate: "",

        VSY_IndexNoerror: "",
        name_error: "",
        company_error: "",
        location_error: "",
        labor_category_error: "",
        labor_rate_error: "",




      });

      var data = {
        VSY_IndexNo: this.state.VSY_IndexNo,
        name: this.state.name,
        company: this.state.company,
        location: this.state.location,
        labor_category: this.state.labor_category,
        labor_rate: this.state.labor_rate



      };
      console.log(data);

      fetch("users/traveller/new", {
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
          name="VSY_IndexNo"
          hintText="Please insert VSY_IndexNo"
          floatingLabelText="VSY Index No"
          onChange={e => this.change(e)}
          value={this.state.VSY_IndexNo}
          errorText={this.state.VSY_IndexNoerror}
          floatingLabelFixed
        />
        <br />

        <TextField
          name="name"
          hintText="Please insert name of the traveller"
          floatingLabelText="Name"
          value={this.state.name}
          onChange={e => this.change(e)}
          errorText={this.state.name_error}
          floatingLabelFixed
        />
        <br />

        <TextField
          name="company"
          hintText="Please insert Company"
          floatingLabelText="Company"
          value={this.state.company}
          onChange={e => this.change(e)}
          errorText={this.state.company_error}
          floatingLabelFixed
        />
        <br />

        <TextField
          name="location"
          hintText="Please insert Location"
          floatingLabelText="Location"
          value={this.state.location}
          onChange={e => this.change(e)}
          errorText={this.state.location_error}
          floatingLabelFixed
        />
        <br />

        <TextField
          name="labor_category"
          hintText="Please insert Labor Category"
          floatingLabelText="labor_category"
          value={this.state.labor_category}
          onChange={e => this.change(e)}
          errorText={this.state.labor_category_error}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="labor_rate"
          hintText="Please insert labor rate"
          floatingLabelText="Labor Rate"
          value={this.state.labor_rate}
          onChange={e => this.change(e)}
          errorText={this.state.labor_rate_error}
          floatingLabelFixed
        />
        <br />
        <br />


        <RaisedButton label="ADD" onClick={e => this.onSubmit(e)} primary/>


      </form>
    );
  }
}
