package org.example.calenj.naverApi.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class NaverSearchResponse {

    private String lastBuildDate;
    private int total;
    private int start;
    private int display;
    private List<Item> items;

    @Data
    public static class Item {
        private String title;
        private String link;
        private String category;
        private String description;
        private String telephone;
        private String address;
        private String roadAddress;
        private String mapx;
        private String mapy;

    }

}