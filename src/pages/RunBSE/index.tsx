import { genChartByAiUsingPost } from '@/services/bse-frontend/chartController';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Spin,
} from 'antd';
import ReactEChart from 'echarts-for-react';
import React, { useState } from 'react';

/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  // useEffect(() => {
  //   listChartByPageUsingPost({}).then((res) => {
  //     console.error('res ', res);
  //   });
  // });

  const [chart, setChart] = useState<API.ChatResponse>(); // API.ChatResponse图表表的数据模型类
  const [option, setOption] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  /**
   * 提交后端处理
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setOption(undefined); // 每次提交清空option，防止上轮图表叠在下轮图表上
    setChart(undefined); // 每次提交清空图表表数据
    // 对接后端


    console.log(values);
    // 提交结束设置为false
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row
        gutter={24} //列与列的间隔
      >
        <Col span={12}>
          <Card title="Input BSE parameters">
            <Form
              name="addChart"
              onFinish={onFinish}
              initialValues={{}}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 16 }}
              labelAlign="left"
            >
              <Form.Item
                name="startTime"
                label="Start time"
                rules={[{ required: true, message: 'Start time is required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="endTime"
                label="End time"
                rules={[{ required: true, message: 'End time is required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="sellerRangeFrom"
                label="Seller range from"
                rules={[{ required: true, message: 'Seller range is required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="sellerRangeTo"
                label="Seller range to"
                rules={[{ required: true, message: 'Seller range is required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="buyerRangeFrom"
                label="Buyer range from"
                rules={[{ required: true, message: 'Seller range is required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="buyerRangeTo"
                label="Buyer range to"
                rules={[{ required: true, message: 'Seller range is required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="orderInterval"
                label="Order interval"
                rules={[{ required: true, message: 'Order interval is required' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name="timeMode" label="Time mode">
                <Select
                  options={[
                    { value: 'periodic', label: 'periodic' },
                    { value: 'fixed', label: 'fixed' },
                    { value: 'drip-fixed', label: 'drip-fixed' },
                    { value: 'drip-jitter', label: 'drip-jitter' },
                    { value: 'drip-poisson', label: 'drip-poisson' },
                  ]}
                />
              </Form.Item>

              <Form.Item name="sellersSpec" label="Seller specific">
                <Input placeholder='e.g. {"ZIC":10, "SHRV":10}' />
              </Form.Item>

              <Form.Item name="buyersSpec" label="Buyer specific">
                <Input placeholder='e.g. {"ZIC":10, "SHRV":10}' />
              </Form.Item>

              <Form.Item name="trialId" label="Trial ID">
                <Input placeholder="please input trial ID" />
              </Form.Item>

              <Form.Item name="name" label="Table name">
                <Input placeholder='please input table name' />
              </Form.Item>

              <Form.Item name="chartType" label="chart type">
                <Select
                  options={[
                    { value: '折线图', label: 'Line Chart' },
                    { value: '柱状图', label: 'Bar Chart' },
                    { value: '堆叠图', label: 'Stacked Chart' },
                    { value: '饼图', label: 'Pie Chart' },
                    { value: '雷达图', label: 'Radar Chart' },
                  ]}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                  <Button htmlType="reset">reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Analysis result">
            {chart?.genResult ?? <div>Please submit analysis first</div>}
            {/* 提交中提示 */}
            <Spin spinning={submitting} />
          </Card>
          <Divider />
          <Card title="Visualization">
            {
              // 如果option存在，才渲染
              option ? <ReactEChart option={option} /> : <div>Please submit analysis first</div>
            }
            <Spin spinning={submitting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
