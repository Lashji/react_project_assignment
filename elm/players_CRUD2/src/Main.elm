-- Fetch players from backend on load
-- Delete player from backend first then delete player from frontend on success
-- modify player from backend first then modify player from frontend on success
-- modify player from backend first then modify player from frontend on success
-- add player to backend first then add player to frontend on success


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)
import Json.Encode as Encode
import Maybe exposing (withDefault)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , baseUrl : String
    , reqStatus : String
    }


type Msg
    = SetName String
    | FetchPlayers (Result Http.Error (List Player))
    | PutPlayerReq Int Bool
    | ModifyPlayer (Result Http.Error Player)
    | PostPlayerReq
    | AddPlayer (Result Http.Error Player)
    | DeletePlayerReq Int
    | DeletePlayer Int (Result Http.Error ())


createPlayer: Int -> String -> Player
createPlayer id name  = 
    Player id name False

getPlayerFromList : Int -> Model -> Player
getPlayerFromList id model =  
    let player = List.head (List.filter(\i -> i.id == id) model.players)
    in
     case player of
        Just p -> p
        Nothing -> initPlayer id 
    
getNextIndex : Model -> Int
getNextIndex model = List.length model.players + 1
    
modifyPlayers : Player -> Model -> List Player
modifyPlayers player model = 
            model.players
            |> List.map(\p -> 
                if player.id == p.id then
                    player
                else 
                    p
            )



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

playerEncoder : Player -> Encode.Value
playerEncoder player =
    Encode.object
        [ ( "id", Encode.int player.id )
        , ( "name", Encode.string player.name )
        , ( "isActive", Encode.bool player.isActive )
        ]


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


postPlayerReq : String -> Player -> Cmd Msg
postPlayerReq url player =
    Http.post
        { url = url
        , expect = Http.expectJson AddPlayer playerDecoder
        , body = Http.jsonBody (playerEncoder player)
        }


deletePlayerReq : String -> Int -> Cmd Msg
deletePlayerReq url id =
    Http.request
        { url = url ++ String.fromInt id
        , expect = Http.expectWhatever (DeletePlayer id)
        , headers = [ Http.header "Accept" "*/*" ]
        , method = "DELETE"
        , body = Http.emptyBody
        , timeout = Nothing
        , tracker = Nothing
        }


putPlayerReq : String -> Player -> Cmd Msg
putPlayerReq url player =
    Http.request
        { url = url ++ String.fromInt player.id
        , expect = Http.expectJson ModifyPlayer playerDecoder
        , headers = [ Http.header "Accept" "*/*" ]
        , method = "PUT"
        , body = Http.jsonBody (playerEncoder player)
        , timeout = Nothing
        , tracker = Nothing
        }


listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


initModel : Model
initModel =
    { players = []
    , newPlayer = initPlayer 0
    , baseUrl = "http://localhost:3001/api/players/"
    , reqStatus = "Loading..."
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initModel
    , fetchPlayers initModel.baseUrl
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName name ->
            ({model| newPlayer = createPlayer (getNextIndex model) name}, Cmd.none )
            
        FetchPlayers data ->
             case data of
                Ok arr ->
                    ({ model | players = arr , reqStatus = ""} , Cmd.none )
                Err e -> 
                    ({model | reqStatus = "An error has occurred!!!"}, Cmd.none) 

        PostPlayerReq ->
            (model, postPlayerReq model.baseUrl model.newPlayer)

        AddPlayer data -> 
            case data of
                Ok p ->
                    ({ model | players = model.players ++ List.singleton p, reqStatus = ""} , Cmd.none )
                Err e -> 
                    ({model | reqStatus = "An error has occurred!!!"}, Cmd.none) 

        PutPlayerReq id status ->
            let player = (getPlayerFromList id model)
            in
            ( model,  putPlayerReq (model.baseUrl) (Player player.id player.name status) )

        ModifyPlayer data ->
            case data of 
                Ok p ->
                    ({ model | players = modifyPlayers p model, reqStatus = ""} , Cmd.none )
                Err e -> 
                    ({model | reqStatus = "An error has occurred!!!"}, Cmd.none) 
                
        DeletePlayerReq id ->
            ( model, deletePlayerReq model.baseUrl id )

        DeletePlayer id data ->
            case data of 
                Ok p ->
                    ({ model | players = deletePlayerFromList model id, reqStatus = ""} , Cmd.none )
                Err e -> 
                    ({model | reqStatus = "An error has occurred!!!"}, Cmd.none) 
           


view : Model -> Html Msg
view model =
      let 
        playerComponent player = div [] [
                                div [class "player-name"] [text player.name]
                                , input [class "player-status", type_ "checkbox", checked player.isActive, onCheck (PutPlayerReq player.id) ] []
                                , br [][]
                                , button [class "btn-delete", onClick (DeletePlayerReq player.id)] [text "Delete" ]
                            ]

        playerList players = ol [id "players-list"] (List.map(\p -> li [id ("player-" ++ String.fromInt p.id)] [playerComponent p]) players)

        addPlayerForm = Html.form [onSubmit PostPlayerReq , id "submit-player"] [
            input [required True, type_ "text", id "input-player", value model.newPlayer.name , placeholder "Player name", onInput SetName] []
            , button [type_ "submit", id "btn-add"  ] [text "Add"]]

        statusText = div [id "request-status"][text model.reqStatus]
    in 
        div []
        [
            h1 [] [text "Add Player"]
            ,addPlayerForm
            ,h1 [] [text "Players List"]
            ,playerList model.players
            ,statusText
        ]




main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
