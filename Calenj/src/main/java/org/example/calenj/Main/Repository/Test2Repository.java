package org.example.calenj.Main.Repository;

import org.example.calenj.Main.domain.Test2;
import org.springframework.data.jpa.repository.JpaRepository;


//dependency로 의존성 관계를 위한 Jpa저장소를 상속받는 인터페이스 생성
public interface Test2Repository extends JpaRepository<Test2, Integer> {
}
