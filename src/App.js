import React, { Component } from 'react';
import './App.css';
import GuestList from "./GuestList";

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: "Treasure",
        isConfirmed: false,
        isEditing: false
      },
      {
        name: "Nic",
        isConfirmed: true,
        isEditing: false
      },
      {
        name: "Matt",
        isConfirmed: true,
        isEditing: true
      }
    ],
  };

  toggleGuestPropertyAt = (property, indexToChange) =>
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            // spread operator... transfers keys & values from one object to another
            ...guest,
            // this line overrides the previous spread operator key/value for isConfirmed
            [property]: !guest[property]
          }
        }

        return guest;
      })
    });

  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt("isConfirmed", index);

  removeGuestAt = index =>
    this.setState({
      guests: [
        // use spread operator to put contents of 2 arrays into this one
        // first array holds all guests including one we want to remove
        // use slice to remove the proper item from the array
        ...this.state.guests.slice(0, index),
        // following produces array of everything after the removed element
        ...this.state.guests.slice(index + 1)
      ]
    });

  toggleEditingAt = index =>
    this.toggleGuestPropertyAt("isEditing", index);

  setNameAt = (name, indexToChange) =>
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            // spread operator... transfers keys & values from one object to another
            ...guest,
            // this line overrides the previous spread operator key/value for isConfirmed
            // since the property name is the same as the key, es6 allows the following simplicity
            name
          }
        }

        return guest;
      })
    });

  toggleFilter = () =>
    this.setState({isFiltered: !this.state.isFiltered});

  handleNameInput = e =>
    this.setState({pendingGuest: e.target.value});

  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        // use spread operator to fill new guests object with other key/values
        ...this.state.guests
      ],
      pendingGuest: "",
    });
  };

  getTotalInvited = () => this.state.guests.length;

  // getAttendingGuests = () =>
  // getUnconfirmedGuests = () =>

  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form onSubmit={this.newGuestSubmitHandler}>
            <input
              type="text"
              onChange={this.handleNameInput}
              value={this.state.pendingGuest}
              placeholder="Invite Someone" />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
                type="checkbox"
                onChange={this.toggleFilter}
                checked={this.state.isFiltered} />
              Hide those who haven't responded
            </label>
          </div>
          <table className="counter">
            <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
            </tbody>
          </table>

          <GuestList
            guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            removeGuestAt={this.removeGuestAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            pendingGuest={this.state.pendingGuest} />

        </div>
      </div>
    );
  }
}

export default App;
