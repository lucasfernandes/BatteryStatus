package com.phonegap.batterystatus;

import org.json.*;
import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

import android.content.Intent;
import android.content.IntentFilter;

public class MyBattery extends Plugin {
  
    public PluginResult execute(String action, JSONArray args, String callinglbackId) {    	

        IntentFilter batteryLevelFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        BatteryReceiver bReceiver = new BatteryReceiver();
        ctx.registerReceiver(bReceiver, batteryLevelFilter);
        
        int level = bReceiver.getLevel();
        try {
            return new PluginResult(PluginResult.Status.OK, "{\"level\":" + level + "}");
        } catch(Exception e) {
            return new PluginResult(PluginResult.Status.INVALID_ACTION, "error: could not read battery!");
        }
    }
}
