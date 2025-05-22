import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import axiosInstance from "@/utils/axiosInstance";
import { DashBoardStyled } from "./styled";

interface SetProductProps {
  title: string;
  items: any[];
}

// 👉 일별 가입자 수
interface DailyUserStat {
  date: string;
  count: number;
}

// 👉 월별 가입자 수
interface MonthlyUserStat {
  month: string;
  count: number;
}

// 👉 일별 결제 금액
interface DailyPaymentStat {
  date: string;
  total: number;
}

interface UserStats {
  total: number;
  daily: DailyUserStat[]; // 👈 수정
  monthly: MonthlyUserStat[];
}

interface PaymentStats {
  totalCount: number;
  totalAmount: number;
  daily: DailyPaymentStat[]; // 👈 수정
}

const AnalyticsDashboard = ({ title, items }: SetProductProps) => {
  const [userStats, setUserStats] = useState<UserStats>({
    total: 0,
    daily: [],
    monthly: [],
  });

  const [paymentStats, setPaymentStats] = useState<PaymentStats>({
    totalCount: 0,
    totalAmount: 0,
    daily: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [
        userTotal,
        userDaily,
        userMonthly,
        paymentTotal,
        paymentDaily,
        countTotal,
      ] = await Promise.all([
        axiosInstance.get("admin/users/total"),
        axiosInstance.get("admin/users/daily"),
        axiosInstance.get("admin/users/monthly"),
        axiosInstance.get("admin/payments/total"),
        axiosInstance.get("admin/payments/daily"),
        axiosInstance.get("admin/payments/count"),
      ]);
      const sortedPaymentDaily = [...paymentDaily.data.daily].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setUserStats({
        total: userTotal.data.count,
        daily: userDaily.data.daily[0].count,
        monthly: userMonthly.data.data,
      });

      setPaymentStats({
        totalCount: countTotal.data.count,
        totalAmount: paymentTotal.data.amount,
        daily: sortedPaymentDaily,
      });
    };

    fetchStats();
  }, []);

  return (
    <DashBoardStyled>
      <div>
        <div className="DashBoard_wrap">
          <div className="DashBoard_set_title">대시보드</div>
          <h2>{title}</h2>
        </div>

        <Row gutter={16}>
          <Col span={6}>
            <Card title="총 가입자 수">{userStats.total}명</Card>
          </Col>
          <Col span={6}>
            <Card title="총 결제 건수">{paymentStats.totalCount}건</Card>
          </Col>
          <Col span={6}>
            <Card title="총 결제 금액">
              {paymentStats.totalAmount.toLocaleString()}원
            </Card>
          </Col>
        </Row>

        <h3 style={{ marginTop: 30 }}>일별 가입자 수</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userStats.daily}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        <h3 style={{ marginTop: 30 }}>월별 가입자 수</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userStats.monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <h3 style={{ marginTop: 30 }}>일별 결제 금액</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={paymentStats.daily}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashBoardStyled>
  );
};

export default AnalyticsDashboard;
