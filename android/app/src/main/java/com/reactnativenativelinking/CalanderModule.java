package com.reactnativenativelinking;

import android.content.Intent;
import android.provider.CalendarContract;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;


// all native modules should extend this class,
// you can also extend BaseJavaModule but this one gives you much more capabilities
class CalendarModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;

    CalendarModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    // a method that you want to be accessed by the native module
    @ReactMethod
    public void createCalendarEvent(String name, String location) {

        Intent intent = new Intent(Intent.ACTION_INSERT)
                .setData(CalendarContract.Events.CONTENT_URI)
                .putExtra(CalendarContract.Events.TITLE, name)
                .putExtra(CalendarContract.Events.EVENT_LOCATION, location);

        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (intent.resolveActivity(context.getPackageManager()) != null) {
            context.startActivity(intent);
        }

//        Toast.makeText(context, "Create event called with name: " + name
//                + " and location: " + location, Toast.LENGTH_SHORT).show();

        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);
    }

    // all ReactContextBaseJavaModule libraries should implement this method
    // to return the name of the module to be accessed then by react native
    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }
}