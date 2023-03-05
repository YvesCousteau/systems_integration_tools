using Firesplash.UnityAssets.SocketIO;
using System;
using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

#if HAS_JSON_NET
//If Json.Net is installed, this is required for Example 6. See documentation for information on how to install Json.NET
//Please note that most recent unity versions bring Json.Net with them by default, you would only need to enable the compiler flag as documented.
using Newtonsoft.Json;
#endif

public class ExampleScript : MonoBehaviour
{
    public SocketIOCommunicator sioCom;
    // public Text uiStatus, uiGreeting, uiPodName;
    public TMPro.TextMeshPro uiSpeed;
    [Serializable]
    struct ItsMeData
    {
        public string version;
    }

    [Serializable]
    struct ServerTechData
    {
        public string timestamp;
        public string podName;
    }

    // Start is called before the first frame update
    void Start()
    {
        sioCom.Instance.On("connect", (string data) => {
            Debug.Log("LOCAL: Hey, we are connected!");
            sioCom.Instance.Emit("speed::subscribe");
        });

        sioCom.Instance.On("speed::update", (string speed) =>
        {
            Debug.Log("Speed "+ speed);
            uiSpeed.text = speed;
        });

        //When the conversation is done, the server will close our connection after we said Goodbye
        sioCom.Instance.On("disconnect", (string payload) => {
            if (payload.Equals("io server disconnect"))
            {
                Debug.Log("Disconnected from server.");
                // uiStatus.text = "Finished. Server closed connection.";
            } 
            else
            {
                Debug.LogWarning("We have been unexpecteldy disconnected. This will cause an automatic reconnect. Reason: " + payload);
            }
        });

        SIOAuthPayload auth = new SIOAuthPayload();
        auth.AddElement("id", 1234); //The server will access this using socket.handshake.auth.id
        auth.AddElement("token", "UnitySample-abc123zyx"); //The server will access this using socket.handshake.auth.token

        //But the following command shows how you can programmatically connect to any server at any given time - in this case including our previously set auth information
        sioCom.Instance.Connect("http://192.168.1.23:6001", false);
    }
}
