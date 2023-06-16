package com.campus_connect.campus_connect.Users.Repository;

import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Dto.ChatQueryResponse;
import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Model.Chat;
import com.campus_connect.campus_connect.Users.AuthAccessPoint.ChatAuthAccess.Model.Type;
import com.campus_connect.campus_connect.Users.User.UsersEntity;
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
