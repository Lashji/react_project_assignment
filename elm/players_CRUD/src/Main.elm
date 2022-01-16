module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Set exposing (Set)
import List exposing (append)


initPlayer : Int -> Player
initPlayer id =
    Player id "" False

createPlayer: Int -> String -> Player
createPlayer id name  = 
    Player id name False

type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , inputString : String
    }


type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int



init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    , inputString = ""
    }

update : Msg -> Model -> Model

update msg model =
    case msg of
        SetName name ->
            Debug.log "SetName"
           {model | inputString = name}

        AddPlayer ->
            Debug.log "Add"
           {model | players = createPlayer (List.length model.players) model.inputString :: model.players} 
           
        DeletePlayer id ->
            Debug.log "Delete"

            {model | players = deletePlayerFromList model id}

        ModifyPlayer id status ->
            Debug.log "Modify"
            {model | players = updatePlayerInlist model id status} 


deletePlayerFromList : Model -> Int -> List Player
deletePlayerFromList model id = 
    model.players 
    |> List.filter(\player -> 
        player.id /= id
    )

updatePlayerInlist : Model -> Int -> Bool -> List Player
updatePlayerInlist model id status =
    model.players 
     |> List.map(\player -> 
         if player.id == id then 
            Player player.id player.name status
        else 
            player
    ) 

view : Model -> Html Msg
view model =
    div [] [ 
        h1 [] [text "Players CRUD"]
        , h1 [] [text "Manage hockey players with Elm"]
        , hr [] []
        , addPlayerForm model
        , div [] [
            h1 [] [text "Players List:"]
            , playerList model.players
        ]
    ]



addPlayerForm :Model -> Html Msg
addPlayerForm model = Html.form [action "", onSubmit AddPlayer, id "submit-player"] [
            input [required True, type_ "text", id "input-player", placeholder "Player name", value model.inputString, onInput SetName] []
            , button [type_ "submit", id "btn-add"  ] [text "Add"]
        ]

playerList : List Player -> Html Msg
playerList players = 
    ol [id "players-list"] (List.map(\p -> li [] [playerComponent p]) players)

playerComponent : Player -> Html Msg
playerComponent player = 
    div [] [
        span [] [text (player.name ++ "-" ++ String.fromInt player.id)]
        , div [class "player-name"] [ 
            input [class "player-status", type_ "checkbox", checked player.isActive, onCheck (ModifyPlayer player.id)] []
            , span [] [text "active"]
        ]
        , button [class "btn-delete", onClick (DeletePlayer player.id)] [text ("Delete - " ++ String.fromInt player.id)]
    ]

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
