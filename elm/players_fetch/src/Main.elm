-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }


type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))

createPlayer: Int -> String -> Player
createPlayer id name  = 
    Player id name False

    
getNextIndex : Model -> Int
getNextIndex model = List.length model.players + 1
    
        

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

playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }


listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


init : () -> ( Model, Cmd Msg )
init _ =
    ( { players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
      }
    , fetchPlayers "http://localhost:3001/api/players/"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName name ->
            ({model| newPlayer = createPlayer (getNextIndex model) name}, Cmd.none )
            
        AddPlayer ->
            ({model | 
                players =model.players ++ List.singleton model.newPlayer ,
                newPlayer = createPlayer (getNextIndex model) ""
            }, Cmd.none) 
            
        DeletePlayer id ->
            ({model | players = deletePlayerFromList model id}, Cmd.none )

        ModifyPlayer id status ->
            ({model | players = updatePlayerInlist model id status}, Cmd.none) 

        FetchPlayers data ->
            case data of
                Ok d ->
                    Debug.log "da"
                    ({ model | players = d} , Cmd.none )
                Err e -> 
                    (model, Cmd.none) 

view : Model -> Html Msg
view model =
    let 
        playerComponent player = div [] [
                                div [class "player-name"] [text player.name]
                                , input [class "player-status", type_ "checkbox", checked player.isActive, onCheck (ModifyPlayer player.id)] []
                                , br [][]
                                , button [class "btn-delete", onClick (DeletePlayer player.id)] [text "Delete" ]
                            ]

        playerList players = ol [id "players-list"] (List.map(\p -> li [id ("player-" ++ String.fromInt p.id)] [playerComponent p]) players)

        addPlayerForm  = Html.form [onSubmit AddPlayer , id "submit-player"] [
            input [required True, type_ "text", id "input-player", value model.newPlayer.name , placeholder "Player name", onInput SetName] []
            , button [type_ "submit", id "btn-add"  ] [text "Add"]]

    in 
        div []
        [
            addPlayerForm
            ,playerList model.players
        ]



main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
