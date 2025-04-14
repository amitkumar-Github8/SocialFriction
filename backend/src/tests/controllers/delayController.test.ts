import { DelayController } from '../../controllers/delayController';

describe('DelayController', () => {
  let delayController: DelayController;

  beforeEach(() => {
    // Create a new instance of DelayController before each test
    delayController = new DelayController();
  });

  test('should initialize with delay time of 0', () => {
    expect(delayController.getDelayTime()).toBe(0);
  });

  test('should set delay time correctly', () => {
    delayController.setDelayTime(10);
    expect(delayController.getDelayTime()).toBe(10);
  });

  test('should apply progressive delay correctly', () => {
    // Initial delay time is 0
    expect(delayController.getDelayTime()).toBe(0);

    // First application of progressive delay
    const firstDelay = delayController.applyProgressiveDelay();
    expect(firstDelay).toBe(5); // Should increase by 5 minutes
    expect(delayController.getDelayTime()).toBe(5);

    // Second application of progressive delay
    const secondDelay = delayController.applyProgressiveDelay();
    expect(secondDelay).toBe(10); // Should increase by another 5 minutes
    expect(delayController.getDelayTime()).toBe(10);
  });

  test('should not exceed maximum delay time of 60 minutes', () => {
    // Set delay time to 58 minutes
    delayController.setDelayTime(58);
    
    // Apply progressive delay
    const newDelay = delayController.applyProgressiveDelay();
    
    // Should be capped at 60 minutes
    expect(newDelay).toBe(60);
    expect(delayController.getDelayTime()).toBe(60);
    
    // Apply progressive delay again
    const finalDelay = delayController.applyProgressiveDelay();
    
    // Should still be capped at 60 minutes
    expect(finalDelay).toBe(60);
    expect(delayController.getDelayTime()).toBe(60);
  });

  test('should reset delay time to 0', () => {
    // Set delay time to a non-zero value
    delayController.setDelayTime(15);
    expect(delayController.getDelayTime()).toBe(15);
    
    // Reset delay time
    delayController.resetDelayTime();
    expect(delayController.getDelayTime()).toBe(0);
  });
});
