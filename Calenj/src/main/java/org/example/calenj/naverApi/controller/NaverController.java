package org.example.calenj.naverApi.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.naverApi.dto.request.NaverSearchRequest;
import org.example.calenj.naverApi.dto.response.NaverSearchResponse;
import org.example.calenj.naverApi.service.NaverService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class NaverController {
    private final NaverService naverService;

    @PostMapping("api/searchLocate")
    public NaverSearchResponse searchLocate(@RequestBody NaverSearchRequest naverSearchRequest) {
        return naverService.locationSearch(naverSearchRequest.getSearchName());
    }
}
