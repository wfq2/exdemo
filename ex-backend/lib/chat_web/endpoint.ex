defmodule ChatWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :chat

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  @session_options [
    store: :cookie,
    key: "_chat_key",
    signing_salt: "SWFKrdCU"
  ]

  socket "/socket", ChatWeb.UserSocket,
    websocket: true,
    longpoll: false
end
