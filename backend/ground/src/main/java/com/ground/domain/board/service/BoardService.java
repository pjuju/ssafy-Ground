package com.ground.domain.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;




@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

//	private final BoardRepository boardRepository;

}
