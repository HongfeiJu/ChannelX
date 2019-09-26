/**
 * Api Testing code
 * Written by Subhradeep Biswas
 * Creation Date: 09/22/2019 (draft)
 * Modification date - 09/23/2019 (working with hardcoded values)
 * @version - 1.0
 */


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserCreationAPI {


    public static void main(String[] args) throws Exception {

        Map<String, String> options = new HashMap<>();
        options.put("instanceLocator", "v1:us1:9e6d3f84-5b05-4c40-b4aa-84930efdb15f");
        options.put("key", "191cc76e-2c59-40cb-95a2-28669ef33f4b:Hsfo8crmOLq8EVVBqW72al7NLmbXVNb5RxogTevT2bE=");

        ChatKit chatKit = new ChatKit(options);


        String userId = "HonffeuSer2";
        String userName = "HongfeiSer2";
        Map<String, Object> userData = new HashMap<String, Object>();
        userData.put("name", userName);


        //String userId = "HonffeuSer";
        String roomName = "My Room No 2";
        Map<String, Object> roomData = new HashMap<String, Object>();
        roomData.put("name", roomName);

        //String userId = "HonffeuSer";
        String joinRoom = "b068c465-9a6f-4727-afb4-dcd68486d1c1";
        Map<String, Object> joinUsers = new HashMap<String, Object>();
        List<String> userIds = new ArrayList<String>();
        userIds.add("HongKong");
        userIds.add("Hongfei");
        userIds.add("Sami");
        joinUsers.put("user_ids", userIds);

        try{
            ApiResponse apiResponse = chatKit.createUser(userId, userData);//chatKit.getUser(userId); //check user already created
            System.out.println(apiResponse);
            ApiResponse apiResponseRoom = chatKit.createRoom(userId, roomData);//chatKit.getUser(userId); //check user already created
            System.out.println(apiResponseRoom);
            ApiResponse apiResponseJoin = chatKit.userJoinRooms(joinRoom, joinUsers);//chatKit.getUser(userId); //check user already created
            System.out.println(apiResponseJoin);


        }catch(Exception e){
            System.out.println(e.getMessage());
        }

    }


}
