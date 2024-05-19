import { genChartByAiUsingPost } from '@/services/bse-frontend/chartController';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactEChart from 'echarts-for-react';
import React, { useState } from 'react';

/**
 * 添加图表流
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
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiUsingPost(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error('analysis failed');
      } else {
        message.success('analysis succeed');
        // 图表的EChart option
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('chart option is null');
        } else {
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (e: any) {
      console.error('analysis failed, ' + e.message);
    }
    // 提交结束设置为false
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row
        gutter={24} //列与列的间隔
      >
        <Col span={12}>
          <Card title="Smart Chart">
            <Form
              name="addChart"
              onFinish={onFinish}
              initialValues={{}}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 16 }}
              labelAlign="left"
            >
              <Form.Item
                name="goal"
                label="Analysis goal"
                rules={[{ required: true, message: 'please input your analysis requirement' }]}
              >
                <TextArea placeholder="please input your analysis requirement" />
              </Form.Item>

              <Form.Item name="name" label="Table name">
                <Input placeholder="please input table type you want" />
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

              <Form.Item
                name="file"
                label="Upload" //原始数据
              >
                <Upload name="file" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                  upload a csv or excel file
                </Upload>
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
