import React from 'react';
import { Socket, Channel } from 'phoenix';
import { TextField, Button } from '@material-ui/core'
import { Formik, Form } from 'formik'

type Props = {
}

type State = {
  inLobby: string
  messages: Message[]
  channel?: Channel
  formState: Message
}

type Message = {
  name: string
  message: string
}

class Chat extends React.Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      inLobby: "nope",
      formState: {name: "", message: ""}
    }
  }

  onShout = (payload: Message) => {
    this.setState((state: State) => ({
      messages: state.messages.concat(payload)
    }))
  }

  onSubmit = (values: Message) => {
    this.state.channel?.push('shout', {
      name: values.name,
      message: values.message
    })
  }

  componentDidMount() {
    let socket = new Socket('ws://127.0.0.1:4000/socket')
    socket.connect()
    let channel = socket.channel("chat_room:lobby")
    channel.join()
      .receive("ok", _ => {
        console.log("in lobby")
        this.setState({inLobby: "yep", channel: channel})
        this.onShout({name: "new user", message: "has joined"})
      })
    channel.on('shout', this.onShout)
  }

  render() {
    return (
      <div>
        <div>
            In lobby: {this.state.inLobby}
        </div>
        <div>
          <Formik onSubmit={this.onSubmit} initialValues={{name:'',message:''}}>
            {({values, handleChange}) => (
            <Form>
              <div>
                <TextField id='name' label='name' name="name" value={values.name} onChange={handleChange}/>
              </div><div>
                <TextField id='message' label='Message' name="message" value={values.message} onChange={handleChange}/>
              </div><div>
                <Button variant="contained" color="primary" type="submit"> Send </Button>
              </div>
            </Form>
            )}
          </Formik>
        </div>
        <div>
          Messages: {this.state.messages.map((m,i) => <p key={i}>{`${m.name}: ${m.message}`} </p>) }
        </div>
    </div>
  )}
}

export default Chat;
