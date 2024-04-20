import { Badge, Card } from "flowbite-react";

type Props = {
  index: number;
  quiz: any;
  getStatus: any;
};
const PassedResults = ({ index, quiz, getStatus }: Props) => {
  return (
    <Card className="mx-2">
      <div
        key={index}
        className=" flex h-auto max-h-[370px]  flex-col  items-center  justify-between border-primary-light rounded-md  transition-all ease-in-out delay-50"
      >
        <img
          src={quiz.thumbnail}
          alt="quiz"
          className="h-[90px] w-[90px] object-contain position-center"
        />
        <div className="flex flex-col py-7 gap-2 items-center ">
          <div className="text- xl  text-dark font-semibold text-center line-clamp-1 hover:line-clamp-none ">
            {quiz.title}
          </div>
          <Badge
            className="pr-[12px] pl-[10px] text-xl bg-white whitespace-nowrap"
            color={quiz.result?.passed ? "success" : "error"}
            size="xs"
          >
            {getStatus(quiz.result, quiz.retry_after)}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default PassedResults;
