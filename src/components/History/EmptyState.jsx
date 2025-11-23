import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faCalendarXmark,
  faFolderOpen
} from "@fortawesome/free-solid-svg-icons";
import "./EmptyState.css";

const EmptyState = ({
  type = "default",
  title,
  message,
  icon
}) => {
  // 타입별 기본 설정
  const defaultConfigs = {
    history: {
      icon: faClipboardList,
      title: "아직 기록이 없어요",
      message: "완료한 할 일이 여기에 표시됩니다"
    },
    year: {
      icon: faCalendarXmark,
      title: "이 연도의 기록이 없어요",
      message: "다른 연도를 선택해보세요"
    },
    default: {
      icon: faFolderOpen,
      title: "데이터가 없습니다",
      message: "표시할 내용이 없습니다"
    }
  };

  const config = defaultConfigs[type] || defaultConfigs.default;
  const finalIcon = icon || config.icon;
  const finalTitle = title || config.title;
  const finalMessage = message || config.message;

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <FontAwesomeIcon icon={finalIcon} />
      </div>
      <h3 className="empty-state-title">{finalTitle}</h3>
      <p className="empty-state-message">{finalMessage}</p>
    </div>
  );
};

export default EmptyState;
