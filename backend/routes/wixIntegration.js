const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Task = require('../models/Task');
const Service = require('../models/Service');

// 同步 Wix 客户
router.post('/sync-clients', async (req, res) => {
  try {
    const { clients } = req.body;
    
    for (let wixClient of clients) {
      let client = await Client.findOne({ wixId: wixClient.id });
      
      if (client) {
        client.name = wixClient.name;
        client.email = wixClient.email;
        // 更新其他字段...
      } else {
        client = new Client({
          wixId: wixClient.id,
          name: wixClient.name,
          email: wixClient.email,
          // 设置其他字段...
        });
      }
      
      await client.save();
    }
    
    res.json({ message: 'Clients synced successfully' });
  } catch (error) {
    console.error('Error syncing Wix clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 同步 Wix 任务
router.post('/sync-tasks', async (req, res) => {
  try {
    const { tasks } = req.body;
    
    for (let wixTask of tasks) {
      let task = await Task.findOne({ wixId: wixTask.id });
      
      if (task) {
        task.title = wixTask.title;
        task.description = wixTask.description;
        task.status = wixTask.status;
        // 更新其他字段...
      } else {
        task = new Task({
          wixId: wixTask.id,
          title: wixTask.title,
          description: wixTask.description,
          status: wixTask.status,
          // 设置其他字段...
        });
      }
      
      await task.save();
    }
    
    res.json({ message: 'Tasks synced successfully' });
  } catch (error) {
    console.error('Error syncing Wix tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 同步 Wix 服务
router.post('/sync-services', async (req, res) => {
  try {
    const { services } = req.body;
    
    for (let wixService of services) {
      let service = await Service.findOne({ wixId: wixService.id });
      
      if (service) {
        service.name = wixService.name;
        service.description = wixService.description;
        service.price = wixService.price;
        // 更新其他字段...
      } else {
        service = new Service({
          wixId: wixService.id,
          name: wixService.name,
          description: wixService.description,
          price: wixService.price,
          // 设置其他字段...
        });
      }
      
      await service.save();
    }
    
    res.json({ message: 'Services synced successfully' });
  } catch (error) {
    console.error('Error syncing Wix services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;