import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import ERequest from "enum/request.enum";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { requestApi } from "request/requestApi";
import { REPLY } from "request/requestUrl";
import IReply, { IRepliesResponse, IReplyCountResponse } from "types/reply.type";
import { IResponse } from "types/response.type";
import { initReplyError } from "modules/reply";
import { useDispatch } from "react-redux";

export default function useFetchReplies(commentIdx: number) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError<IResponse>>(null);
  const [replyCount, setReplyCount] = useState<number>(0);
  const [replies, setReplies] = useState<IReply[]>([]);

  const fetchReplyCountHandler = useCallback(async () => {
    setLoading(true);
    try {
      const { data }: IReplyCountResponse = await requestApi(
        REPLY.GET.COUNT(commentIdx),
        ERequest.GET
      );
      const { reply_count } = data;

      setReplyCount(reply_count);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [commentIdx, setReplyCount, setError]);

  const fetchRepliesHandler = useCallback(async () => {
    setLoading(true);
    try {
      const { data }: IRepliesResponse = await requestApi(REPLY.GET.ALL(commentIdx), ERequest.GET);
      const { replies } = data;

      setReplies(replies);
      setReplyCount(replies.length);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [commentIdx, setReplies, setError]);

  const onShowRepliesHandler = useCallback(() => {
    setShowReplies((showReplies) => !showReplies);
  }, [setShowReplies]);

  useEffect(() => {
    fetchReplyCountHandler();
  }, [fetchReplyCountHandler]);

  useEffect(() => {
    if (showReplies && replyCount) {
      fetchRepliesHandler();
    }
  }, [replyCount, showReplies, fetchRepliesHandler]);

  useEffect(() => {
    if (error) {
      toast.error("답글 부분에서 오류가 발생했어요!");
      dispatch(initReplyError());
      history.push("/");
    }
  }, [error, history, dispatch]);

  return {
    loading,
    replyCount,
    replies,
    showReplies,
    onShowRepliesHandler,
    fetchRepliesHandler,
  };
}
