import React from "react";
import UserComment from "./UserComment";

const data = [
  {
    username: "hungdc03",
    dateReview: "06/06/2023",
    rating: 5,
    comment:
      "Trẻ con vốn dĩ cần được sống vô tư trong sự bảo bọc và bao dung, thay vì gượng ép chúng phải hiểu chuyện và hành xử như một người lớn. Zezé là một đứa trẻ sáng dạ, cậu bé luôn hỏi tất cả những thứ gì cậu muốn biết, cậu có một niềm đam mê đặc biệt với từ ngữ. Khi nghe được một từ nào lạ Zezé đều mong muốn hiểu được ý nghĩa của nó và sử dụng chúng. Cậu cũng là một đứa trẻ có trách nhiệm, ít nhất là trong lời nói. Khi đối diện với cậu em Luis cậu luôn cẩn trọng từng câu, bởi vì cậu không muốn dạy em mình bất kì từ nào không chính xác Vốn là một đứa trẻ hiếu động, những trò tinh nghịch của Zezé luôn khiến cho người khác phiền lòng. Và ắc hẳn cũng vì lý do đó mà cậu bị cho là trong máu có quỷ. Kể cả khi cậu bộc lộ được thiên phú là biết đọc dù không được ai dạy, ấy vậy mà mọi người lại đều cho rằng quỷ sứ đã dạy cậu trong giấc ngủ Có lẽ ít ai nhận thấy ẩn sâu bên trong đứa trẻ tinh nghịch đó là một trái tim vô cùng ấm áp và khát khao có được tình yêu thương. Có hay chăng sự nghịch ngợm của Zezé chỉ là muốn tạo được sự chú ý đối với gia đình. Cậu mong mỏi ở gia đình một người chịu lắng nghe cậu, quan tâm cậu, giành thời gian hơn cho cậu. Bởi lẽ, khi nhận được sự quan tâm từ người ngoài, cậu liền trở nên ngoan ngoãn và vâng lời hơn. Đứa trẻ tự chơi tự học, cũng có thể tự kiếm tiền bằng cách đi đánh giày để mua tặng cha một bao thuốc lá, không thể nào lại là đứa trẻ hư, nhỉ?",
  },
  {
    username: "Mai Linh",
    dateReview: "16/05/2021",
    rating: 3,
    comment:
      "Quá nhiều cảm xúc hòa lẫn trong tâm trí tôi sau khi đọc xong quyển sách này. Quyển sách là tiếng nói, là nỗi lòng của một đứa trẻ mà theo tôi bất cứ ai khi đọc xong cũng nhận ra rằng tình yêu thương, sự quan tâm có vai trò lớn lao thế nào đối với trẻ. Cậu bé Zezé năm tuổi trong câu chuyện cũng hồn nhiên, trong sáng như Anne tóc đỏ, như cô bé Heidi, cũng có phần nghịch ngợm như thằng nhóc Emil. Cậu bé đã khiến tôi phì cười không ít lần. Dù hay gây ra rắc rối nhưng Zezé là một em bé theo tôi là rất đáng yêu. Truyện đưa ta đến với những trò quậy phá, những vụn vặt ngày thường của cậu bé nhưng không hề nhàm chán chút nào cả. Tôi rất hứng thú khi được đặt bước chân vào thế giới của cậu bé con ấy để hiểu hơn về trẻ, để có thể nuôi dạy con một cách tốt nhất. Tôi lắng nghe từng suy nghĩ, từng câu thoại của cậu bé và càng thấm thía hơn bao giờ hết: Trong trái tim đứa trẻ đôi khi có những con quỷ dữ, hãy đánh đuổi con quỷ ấy đi bằng sự thấu hiểu, bằng tình yêu, sự bao dung chứ không phải là dùng đòn roi. Đòn roi, bạo lực chưa bao giờ là cách giải quyết tốt nhất cho mọi vấn đề. Cuốn sách không phải là dòng suối êm ả của ngôn từ, chẳng bóng bẩy, óng ả câu chữ, nó vốn dĩ mang hơi thở của đời thường. Nhưng nó lại đặc biệt bởi diễn biến cốt truyện hấp dẫn, tác giả biết cách dẫn dắt để đưa ta lên đỉnh đồi của cao trào, có lúc đặt ta vào những cảm xúc dịu êm như dải lụa mềm mại. Nhà văn biết cách để bóp nghẹt tim ta, làm nước mắt ta tuôn trào.",
  },
];

const FormComment = () => {
  return (
    <div className="w-[80%] rounded-lg m-auto shadow-2xl border-2 mb-5 divide-y-2 divide-neutral-500 divide-dashed">
      {data.map((value, index) => {
        return (
          <UserComment
            rating={value.rating}
            comment={value.comment}
            username={value.username}
            date={value.dateReview}
          />
        );
      })}
    </div>
  );
};

export default FormComment;
