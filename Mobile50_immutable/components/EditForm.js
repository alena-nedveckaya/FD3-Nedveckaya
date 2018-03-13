import React from 'react';
import PropTypes from 'prop-types'

class EditForm extends React.Component{
    static propTypes = {
        client:PropTypes.shape({
          id: PropTypes.number.isRequired,
          fio: PropTypes.string.isRequired,
          balance: PropTypes.number.isRequired,
        }),
      };

      state = {
        client: this.props.client,
      };

    render(){
        console.log('EditForm render')
        console.log(this.props.client.fio)
        return  <div>
                    <div>
                        <label>
                            ФИО
                            <input defaultValue={this.props.client.fio}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Баланс
                            <input defaultValue={this.props.client.balance}/>
                        </label>
                    </div>

                </div>
    }

}

export default EditForm;