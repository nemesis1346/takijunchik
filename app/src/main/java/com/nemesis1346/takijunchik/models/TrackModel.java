package com.nemesis1346.takijunchik.models;

/**
 * Created by nemesis1346 on 01/10/17.
 */

public class TrackModel {
    private String trackId;
    private String trackName;
    private String trackType;
    private String path_file;
    private String trackRate;

    public TrackModel(){}

    public String getTrackId() {
        return trackId;
    }

    public void setTrackId(String trackId) {
        this.trackId = trackId;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    public String getTrackType() {
        return trackType;
    }

    public void setTrackType(String trackType) {
        this.trackType = trackType;
    }

    public String getPath_file() {
        return path_file;
    }

    public void setPath_file(String path_file) {
        this.path_file = path_file;
    }

    public String getTrackRate() {
        return trackRate;
    }

    public void setTrackRate(String trackRate) {
        this.trackRate = trackRate;
    }
}
