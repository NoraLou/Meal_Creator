import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import CalenderIcon from 'react-icons/lib/fa/calendar-plus-o'

class App extends Component {



  render() {

    const { calendar, remove } = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className ='container'>
        <ul className='meal-types'>
          {mealOrder.map( mealType => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ food, calendar }) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
          : null

        return meals
      }, {})
    })),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  }
}

//Using connect(), we can conveniently access the store context set by Provider. We pass in parts of the state as well as action-dispatches to the components as props
// mapStateToProps is a function that lets connect() know how to map state into the component’s list of props. - not all of the stores state is filtered down just select slices of it. 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)