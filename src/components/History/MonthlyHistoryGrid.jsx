import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./MonthlyHistoryGrid.css";

const MonthCard = ({ month, items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Card className="month-card">
      <Card.Header className="month-card-header">
        <span className="month-label">{month}월</span>
        <div className="pagination-buttons">
          {currentPage > 0 && (
            <Button
              variant="link"
              className="detail-button"
              onClick={handlePrevPage}
            >
              &lt;
            </Button>
          )}
          {currentPage < totalPages - 1 && (
            <Button
              variant="link"
              className="detail-button"
              onClick={handleNextPage}
            >
              &gt;
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Body className="month-card-body">
        <ul className="achievement-list">
          {currentItems.map((item, idx) => (
            <li key={idx} className="achievement-item">
              {item}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

const MonthlyHistoryGrid = () => {
  const [year, setYear] = useState(2025);

  // 샘플 데이터
  const monthlyData = [
    {
      month: 1,
      items: [
        "한강 조깅",
        "리액트 공부하기",
        "독서 3권",
        "요가 수업",
        "프로젝트 완성",
        "블로그 작성",
        "영어 회화 학습",
        "알고리즘 문제 풀이"
      ]
    },
    {
      month: 2,
      items: [
        "프로젝트 완성",
        "운동 20일 달성",
        "포트폴리오 정리",
        "자격증 시험 준비",
        "독서 5권 완료"
      ]
    },
    {
      month: 3,
      items: [
        "영어 회화",
        "알고리즘 풀기",
        "요가 시작",
        "새 언어 배우기",
        "포트폴리오 업데이트",
        "네트워킹 이벤트",
        "기술 블로그 시작"
      ]
    },
    {
      month: 4,
      items: [
        "새 취미 찾기",
        "여행 계획",
        "등산 5회",
        "사진 촬영 배우기",
        "요리 수업"
      ]
    },
    {
      month: 5,
      items: [
        "사이드 프로젝트",
        "헬스 등록",
        "블로그 작성",
        "프론트엔드 스터디",
        "리팩토링 완료",
        "코드 리뷰"
      ]
    },
    {
      month: 6,
      items: [
        "자격증 공부",
        "독서 모임",
        "컨퍼런스 참석",
        "오픈소스 기여",
        "멘토링 시작",
        "새 프레임워크 학습"
      ]
    },
    {
      month: 7,
      items: [
        "등산 3회",
        "코딩 테스트 준비",
        "알고리즘 스터디",
        "프로젝트 배포",
        "성능 최적화"
      ]
    },
    {
      month: 8,
      items: [
        "포트폴리오 정리",
        "운동 루틴 완성",
        "새 기술 스택 학습",
        "팀 프로젝트 시작",
        "디자인 패턴 공부",
        "테스트 코드 작성"
      ]
    },
    {
      month: 9,
      items: [
        "새로운 언어 학습",
        "습관 만들기",
        "일일 코딩",
        "책 집필 시작",
        "강의 수강"
      ]
    },
    {
      month: 10,
      items: [
        "프로젝트 배포",
        "기술 블로그",
        "컨퍼런스 발표",
        "이력서 업데이트",
        "포트폴리오 개선",
        "CI/CD 구축"
      ]
    },
    {
      month: 11,
      items: [
        "이력서 업데이트",
        "네트워킹",
        "면접 준비",
        "자격증 취득",
        "스터디 리딩",
        "사이드 프로젝트 완성"
      ]
    },
    {
      month: 12,
      items: [
        "연말 정리",
        "내년 계획",
        "목표 설정",
        "회고록 작성",
        "감사 일기",
        "새해 다짐",
        "건강 검진"
      ]
    },
  ];

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  return (
    <div className="monthly-history-grid">
      <Container>
        <div className="grid-box">
          {/* 연도 네비게이터 */}
          <div className="year-navigator">
            <Button variant="outline-secondary" onClick={handlePrevYear}>
              &lt;
            </Button>
            <h3 className="year-title">{year}</h3>
            <Button variant="outline-secondary" onClick={handleNextYear}>
              &gt;
            </Button>
          </div>

          {/* 월별 카드 그리드 */}
          <Row className="month-cards-row">
            {monthlyData.map((data) => (
              <Col key={data.month} md={3} sm={6} xs={12} className="mb-4">
                <MonthCard month={data.month} items={data.items} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MonthlyHistoryGrid;
