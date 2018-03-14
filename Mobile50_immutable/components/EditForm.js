import React from 'react';
import PropTypes from 'prop-types'

class EditForm extends React.PureComponent{
    static propTypes = {
        client:PropTypes.shape({
          id: PropTypes.number.isRequired,
          fio: PropTypes.string.isRequired,
          balance: PropTypes.number.isRequired,
        }),
      };

      state = {
        client: this.props.client, newName:this.props.client.fio
      };

    componentWillReceiveProps = (newProps) => {
        console.log("EditForm componentWillReceiveProps");
       this.setState({client: newProps.client, newName:newProps.client.fio})

    };
      changeFIO = (EO) =>{

          this.setState({newName:EO.target.value});
          console.log(this.state.newName)
      };


    render(){
        console.log('EditForm render');
        console.log(this.state.newName, this.state.client, this.props.client);
        return  <div>
                    <div>
                        <label>
                            ФИО

                            <input value={this.state.newName} onChange={this.changeFIO}/>
                        </label>
                    </div>

                    {/*<div>*/}
                        {/*<label>*/}
                            {/*Баланс1*/}
                            {/*<input value={this.props.client.balance }/>*/}
                        {/*</label>*/}
                    {/*</div>*/}

                </div>
    }

}

export default EditForm;