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

                @Data
                public static class Location {
                    private List<Double> location;
                }

                @Data
                public static class Goal {
                    private List<Double> location;
                    private int dir;
                }
            }

        }
    }

    // Getters and Setters
}
