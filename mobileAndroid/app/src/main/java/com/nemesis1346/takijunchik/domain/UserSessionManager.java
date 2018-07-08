package com.nemesis1346.takijunchik.domain;


import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.google.gson.Gson;
import com.nemesis1346.takijunchik.models.UserModel;

/**
 * Created by nemesis1346 on 01/10/17.
 */

public class UserSessionManager {

    private static final String PREFERENCES_USER = "com.nemesis1346.takijunchik.preferences.user";
    private static final String KEY_USER = "com.nemesis1346.takijunchik.preferences.keys.user";
    private Context mContext;
    private static UserSessionManager sInstance;

    //This is the constructor of the instance
    public static UserSessionManager getInstance(Context context) {
        if (sInstance == null) {
            sInstance = new UserSessionManager(context);
        }
        return sInstance;
    }

    //This is the constructor of the class
    private UserSessionManager(Context context) {
        mContext = context;
    }

    /**
     * This function let save the user information in session
     */
    public void saveLocalUser(UserModel userModel) {
        clearLocalUser();
        Gson gson = new Gson();
        String userString = gson.toJson(userModel);
        SharedPreferences sharedPref = mContext.getSharedPreferences(PREFERENCES_USER, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(KEY_USER, userString);
        editor.commit();
        Log.d("UserSessionManager: ", " user model saved");

    }

    /**
     * Function to clear the user cache
     */
    public void clearLocalUser() {
        SharedPreferences sharedPref = mContext.getSharedPreferences(PREFERENCES_USER, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.clear();
        editor.commit();
        Log.d("UserSessionManager: ", "the current user was deleted");
    }

}
