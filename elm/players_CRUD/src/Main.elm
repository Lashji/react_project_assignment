module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)




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

    }

update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            {model| newPlayer = createPlayer (getNextIndex model) name} 
            
        AddPlayer ->
            {model | 
                players =model.players ++ List.singleton model.newPlayer ,
                newPlayer = createPlayer (getNextIndex model) ""
            } 
            
        DeletePlayer id ->
            {model | players = deletePlayerFromList model id}

        ModifyPlayer id status ->
            {model | players = updatePlayerInlist model id status} 


getNextIndex : Model -> Int
getNextIndex model = List.length model.players 
    
        

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



addPlayerForm : Model ->  Html Msg
addPlayerForm model = Html.form [onSubmit AddPlayer , id "submit-player"] [
            input [required True, type_ "text", id "input-player", value model.newPlayer.name , placeholder "Player name", onInput SetName] []
            , button [type_ "submit", id "btn-add"  ] [text "Add"]
        ]

playerList : List Player -> Html Msg
playerList players = 
    ol [id "players-list"] (List.map(\p -> li [id ("player-" ++ String.fromInt p.id)] [playerComponent p]) players)

playerComponent : Player -> Html Msg
playerComponent player = 
    div [] [
        div [class "player-name"] [text player.name]
        , input [class "player-status", type_ "checkbox", checked player.isActive, onCheck (ModifyPlayer player.id)] []
        , br [][]
        , button [class "btn-delete", onClick (DeletePlayer player.id)] [text "Delete" ]
    ]

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
