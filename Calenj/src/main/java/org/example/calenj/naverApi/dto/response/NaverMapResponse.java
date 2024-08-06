package org.example.calenj.naverApi.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class NaverMapResponse {

    private int code;
    private String message;
    private String currentDateTime;
    private Route route;

    // Getters and Setters
    @Data
    public static class Route {
        private List<Trafast> trafast;

        // Getters and Setters
        @Data
        public static class Trafast {
            private Summary summary;
            private List<List<Double>> path;
            private List<Section> section;
            private List<Guide> guide;

            // Getters and Setters
            @Data
            public static class Summary {
                private Location start;
                private Goal goal;
                private int distance;
                private int duration;
                private List<List<Double>> bbox;
                private int tollFare;
                private int taxiFare;
                private int fuelPrice;

                // Getters and Setters
                @Data
                public static class Location {
                    private List<Double> location;

                    // Getters and Setters
                }

                @Data
                public static class Goal {
                    private List<Double> location;
                    private int dir;

                    // Getters and Setters
                }
            }

            @Data
            public static class Section {
                private int pointIndex;
                private int pointCount;
                private int distance;
                private String name;
                private int congestion;
                private int speed;

                // Getters and Setters
            }

            @Data
            public static class Guide {
                private int pointIndex;
                private int type;
                private String instructions;
                private int distance;
                private int duration;

                // Getters and Setters
            }
        }
    }

    // Getters and Setters
}
