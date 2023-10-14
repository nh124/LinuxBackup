package com.universit.UniversityConnectServer.Users.Repository;

import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatQueryResponse;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Model.Chat;
import com.universit.UniversityConnectServer.Users.AuthAccessPoint.ChatAuthAccess.Model.Type;
import com.universit.UniversityConnectServer.Users.User.UsersEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query(value = "select *" +
            "from chat join user on chat.users_id = user.user_id", nativeQuery = true)
    List<Chat> getAllUserMessages();


}
