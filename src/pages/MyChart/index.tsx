import { listMyChartByPageUsingPost } from '@/services/bse-frontend/chartController';
import { useModel } from '@umijs/max';
import { Avatar, Card, List, message } from 'antd';
import Search from 'antd/es/input/Search';
import ReactEChart from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPost(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
        // 隐藏图标的title
        if (res.data.records) {
          res.data.records.forEach((chart) => {
            const chartOption = JSON.parse(chart.genChart ?? '{}');
            chartOption.title = undefined;
            chart.genChart = JSON.stringify(chartOption);
          });
        }
      } else {
        message.error('Query chart error');
      }
    } catch (e: any) {
      message.error('Query chart error' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <div>
        <Search
          placeholder="Please input chart name"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              // 原始搜索条件
              ...initSearchParams,
              // 搜索词
              name: value,
            });
          }}
        />
      </div>
      <div className="margin-16" />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize: pageSize,
            });
          },
          current: searchParams.current,
          total: total,
          pageSize: searchParams.pageSize,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.name}
                description={item.chartType ? 'Chart type: ' + item.chartType : undefined}
              />
              <div style={{ marginBottom: 16 }} />
              <p>{'Analysis goal: ' + item.goal}</p>
              <div style={{ marginBottom: 16 }} />

              <ReactEChart option={item.genChart && JSON.parse(item.genChart)} />
            </Card>
          </List.Item>
        )}
      />
      总数
      {total}
    </div>
  );
};
export default MyChartPage;
