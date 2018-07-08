package com.nemesis1346.takijunchik.models;

/**
 * Created by nemesis1346 on 01/10/17.
 */

public class CommentModel {
    private String commentId;
    private String userId;
    private String comment;
    private String postId;

    public CommentModel(){}

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }
}
